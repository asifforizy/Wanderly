import { randomInt } from "node:crypto";
import {
  DestinationCategory,
  Prisma,
} from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import {
  ICreateDestinationPayload,
  IDestinationQuery,
  IUpdateDestinationPayload,
} from "./destination.interface";
import httpStatus from "http-status";

const BUDGET_RANGES: Record<string, Prisma.IntFilter> = {
  low: { lt: 500 },
  medium: { gte: 500, lte: 1500 },
  high: { gt: 1500 },
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const generateUniqueSlug = async (name: string, country: string) => {
  const base = slugify(`${name} ${country}`);
  let slug = base;

  while (
    await prisma.destination.findUnique({
      where: { slug },
      select: { id: true },
    })
  ) {
    slug = `${base}-${randomInt(1000, 10000)}`;
  }

  return slug;
};

const getAllDestinations = async (query: IDestinationQuery) => {
  const { search, category, budget, sort = "name", order = "asc" } = query;

  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 9, 1), 50);

  const where: Prisma.DestinationWhereInput = {};

  if (search?.trim()) {
    const term = search.trim();
    where.OR = [
      { name: { contains: term, mode: "insensitive" } },
      { country: { contains: term, mode: "insensitive" } },
      { location: { contains: term, mode: "insensitive" } },
    ];
  }

  if (category) {
    const normalized = category.toUpperCase();
    if (!(normalized in DestinationCategory)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid category");
    }
    where.category = normalized as DestinationCategory;
  }

  if (budget) {
    const range = BUDGET_RANGES[budget.toLowerCase()];
    if (!range) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Invalid budget. Use low, medium or high"
      );
    }
    where.estimatedBudget = range;
  }

  const direction: Prisma.SortOrder = order === "desc" ? "desc" : "asc";
  const orderBy: Prisma.DestinationOrderByWithRelationInput =
    sort === "budget" ? { estimatedBudget: direction } : { name: direction };

  const [data, total] = await Promise.all([
    prisma.destination.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.destination.count({ where }),
  ]);

  return {
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    data,
  };
};

const getMyDestinations = async (userId: string) => {
  return prisma.destination.findMany({
    where: { createdById: userId, isSeed: false },
    orderBy: { createdAt: "desc" },
  });
};

const getDestinationById = async (idOrSlug: string) => {
  const destination = await prisma.destination.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
    include: {
      createdBy: { select: { id: true, name: true } },
    },
  });

  if (!destination) {
    throw new AppError(httpStatus.NOT_FOUND, "Destination Not Found");
  }

  return destination;
};

const getRelatedDestinations = async (idOrSlug: string) => {
  const current = await prisma.destination.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
    select: { id: true, category: true, country: true },
  });

  if (!current) {
    throw new AppError(httpStatus.NOT_FOUND, "Destination Not Found");
  }

  return prisma.destination.findMany({
    where: {
      id: { not: current.id },
      OR: [{ category: current.category }, { country: current.country }],
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
};

const createDestination = async ( userId: string, payload: ICreateDestinationPayload) => {
  const slug = await generateUniqueSlug(payload.name, payload.country);

  return prisma.destination.create({
    data: {
      ...payload,
      slug,
      isSeed: false,
      createdById: userId,
    },
  });
};

const updateDestination = async (id: string,userId: string,payload: IUpdateDestinationPayload) => {
  const destination = await prisma.destination.findUnique({ where: { id } });

  if (!destination) {
    throw new AppError(httpStatus.NOT_FOUND, "Destination Not Found");
  }

  if (destination.isSeed || destination.createdById !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You Can Only Edit Your Own Destinations"
    );
  }

  return prisma.destination.update({
    where: { id },
    data: payload,
  });
};

const deleteDestination = async (id: string, userId: string) => {
  const destination = await prisma.destination.findUnique({ where: { id } });

  if (!destination) {
    throw new AppError(httpStatus.NOT_FOUND, "Destination Not Found");
  }

  if (destination.isSeed || destination.createdById !== userId) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You Can Only Delete Your Own Destinations"
    );
  }

  await prisma.destination.deleteMany({
    where: { id, createdById: userId, isSeed: false },
  });
};

export const DestinationService = {
  getAllDestinations,
  getMyDestinations,
  getDestinationById,
  getRelatedDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
};
