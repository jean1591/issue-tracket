import { NextRequest, NextResponse } from "next/server";

import authOptions from "@/app/auth/authOptions";
import { createProjectSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();

  const validation = createProjectSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newProject = await prisma.project.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newProject, { status: 201 });
}
