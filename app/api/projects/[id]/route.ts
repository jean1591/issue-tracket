import { NextRequest, NextResponse } from "next/server";

import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { patchProjectSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();

  const validation = patchProjectSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { assignedToUserId, description, title } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }
  }

  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id, 10) },
  });

  if (!project) {
    return NextResponse.json({ error: "Invalid project" }, { status: 404 });
  }

  const updatedProject = await prisma.project.update({
    where: { id: project.id },
    data: {
      assignedToUserId,
      title,
      description,
    },
  });

  return NextResponse.json(updatedProject);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id, 10) },
  });

  if (!project) {
    return NextResponse.json({ error: "Invalid project" }, { status: 404 });
  }

  await prisma.project.delete({ where: { id: project.id } });

  return NextResponse.json({});
}
