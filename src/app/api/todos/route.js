import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);

  const todos = await res.json();

  return NextResponse.json(todos);
}

export async function POST(req) {
  const { userId, title } = await req.json();

  if (!userId || !title) {
    return NextResponse.json({ meesage: "Missing required data" });
  }

  const res = await fetch(DATA_SOURCE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      title,
      completed: false,
    }),
  });

  const newTodo = await res.json()

  return NextResponse.json(newTodo);
}

export async function PUT(req) {
  const { userId, id, title, completed } = await req.json();

  if (!userId || !title || !id || typeof(completed) !== 'boolean') {
    return NextResponse.json({ meesage: "Missing required data" });
  }

  const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      title,
      completed,
    }),
  });

  const updatedTodo = await res.json()

  return NextResponse.json(updatedTodo);
}

export async function DELETE(req) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ meesage: "Todo ID required" });
  }

  await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json({ message: `Todo ${id} deleted` });
}
