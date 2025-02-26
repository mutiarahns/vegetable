import { Hono } from "hono";
import { Vegetable } from "./types/vegetables";
import { vegetables as vegetablesData } from "./data/vegetable";

const app = new Hono();

let vegetables = vegetablesData;

app.get("/", (c) => {
  return c.json({
    message: "Vegetable API",
  });
});

// Get all vegetables
app.get("/vegetables", (c) => {
  return c.json(vegetables);
});

// Get vegetable by id
app.get("/vegetables/:id", (c) => {
  const id = c.req.param("id");

  const vegetable = vegetables.find((v) => v.id === Number(id));

  if (!vegetable) {
    return c.json({ message: "Vegetable not found" }, 404);
  }

  return c.json(vegetable);
});

// Create a new vegetable
app.post("/vegetables", async (c) => {
  const body: Omit<Vegetable, "id" | "createdAt" | "updatedAt"> =
    await c.req.json();

  const foundVegetable = vegetables.find(
    (vegetable) => vegetable.name.toLowerCase() === body.name.toLowerCase()
  );

  if (foundVegetable) {
    return c.json({ message: "Vegetable already exists" }, 409);
  }

  const newVegetable = {
    id: vegetables[vegetables.length - 1].id + 1,
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };

  const newVegetables = [...vegetables, newVegetable];

  vegetables = newVegetables;

  return c.json(newVegetable);
});

// Delete all vegetables
app.delete("/vegetables", (c) => {
  vegetables = [];

  return c.json({ message: "Vegetables deleted" });
});

// Delete a vegetable by id
app.delete("/vegetables/:id", async (c) => {
  const id = c.req.param("id");

  const foundVegetable = vegetables.find(
    (vegetable) => vegetable.id === Number(id)
  );

  if (!foundVegetable) {
    return c.json({ message: "Vegetable not found" }, 404);
  }

  const newVegetables = vegetables.filter((v) => v.id !== Number(id));

  vegetables = newVegetables;

  return c.json({
    message: "Vegetable deleted",
    data: foundVegetable,
  });
});

// Update a vegetable by id
app.patch("/vegetables/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const foundVegetable = vegetables.find((vegetable) => vegetable.id === id);

  if (!foundVegetable) {
    return c.json({ message: "Vegetable not found" }, 404);
  }

  const body = await c.req.json();

  const updatedVegetable = {
    ...foundVegetable,
    ...body,
    updatedAt: new Date().toISOString(),
  };

  const updatedVegetables = vegetables.map((vegetable) =>
    vegetable.id === id ? updatedVegetable : vegetable
  );

  vegetables = updatedVegetables;

  return c.json(updatedVegetable);
});

// Update a vegetable by id, create if not exists
app.put("/vegetables/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  const foundVegetable = vegetables.find((vegetable) => vegetable.id === id);

  if (!foundVegetable) {
    const newVegetable = {
      ...body,
      id: id,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };

    vegetables = [...vegetables, newVegetable];

    return c.json({
      message: `Vegetable with id ${id} is created`,
      vegetables,
    });
  }

  const updatedVegetable = {
    ...foundVegetable,
    ...body,
    updatedAt: new Date().toISOString(),
  };

  const updatedVegetables = vegetables.map((vegetable) =>
    vegetable.id === id ? updatedVegetable : vegetable
  );

  vegetables = updatedVegetables;

  return c.json(updatedVegetable);
});

export default app;
