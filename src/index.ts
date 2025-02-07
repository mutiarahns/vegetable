import { Hono } from "hono";

const app = new Hono();

type Vegetable = {
  id: number;
  name: string;
};

let vegetables: Vegetable[] = [
  { id: 1, name: "Carrot" },
  { id: 2, name: "Tomato" },
  { id: 3, name: "Lettuce" },
  { id: 4, name: "Pumkin" },
  { id: 5, name: "Okra" },
  { id: 6, name: "Cucumber" },
];

app.get("/", (c) => {
  return c.json({
    message: "Hello World",
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
  const body = await c.req.json();

  const newVegetables = [
    ...vegetables,
    { ...body, id: vegetables[vegetables.length - 1].id + 1 },
  ];

  vegetables = newVegetables;

  return c.json(vegetables);
});

// Delete all vegetables
app.delete("/vegetables", (c) => {
  vegetables = [];

  return c.json({ message: "Vegetables deleted" });
});

// Delete a vegetable by id
app.delete("/vegetables/:id", async (c) => {
  const id = c.req.param("id");

  const index = vegetables.findIndex((v) => v.id === Number(id));

  if (index === -1) {
    return c.json({ message: "Vegetable not found" }, 404);
  }

  const newVegetables = vegetables.filter((v) => v.id !== Number(id));

  vegetables = newVegetables;

  return c.json({ message: "Vegetable deleted", newVegetables });
});

// Update a vegetable by id
app.patch("/vegetables/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const index = vegetables.findIndex((v) => v.id === id);

  if (index === -1) {
    return c.json({ message: "Vegetable not found" }, 404);
  }

  const body = await c.req.json();

  const updatedVegetables = vegetables.map((vegetable) =>
    vegetable.id === id ? { ...body, id: id } : vegetable
  );

  vegetables = updatedVegetables;

  return c.json({ updatedVegetables });
});

// Update a vegetable by id, create if not exists
app.put("/vegetables/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  const index = vegetables.findIndex((v) => v.id === id);

  if (index === -1) {
    const newVegetable = { id: id, ...body };

    vegetables = [...vegetables, newVegetable];

    return c.json({
      message: `Vegetable with id ${id} is created`,
      vegetables,
    });
  }

  const updatedVegetables = vegetables.map((vegetable) =>
    vegetable.id === id ? { ...body, id: id } : vegetable
  );

  vegetables = updatedVegetables;

  return c.json({ updatedVegetables });
});

export default app;
