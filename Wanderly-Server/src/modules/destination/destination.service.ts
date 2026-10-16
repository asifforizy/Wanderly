import { randomInt } from "node:crypto";
import {
  DestinationCategory,
  Prisma,
} from "../../../prisma/generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { IDestinationQuery } from "./destination.interface";
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

export const DestinationService = {
  getAllDestinations,
  getMyDestinations,
};
