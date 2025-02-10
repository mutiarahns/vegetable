import { Hono } from "hono";

const app = new Hono();

type Vegetable = {
  id: number;
  name: string;
  classification: string;
  createdAt: string;
  updatedAt?: string | null;
};

let vegetables: Vegetable[] = [
  {
    id: 1,
    name: "Carrot",
    classification: "Roots",
    createdAt: new Date().toISOString(),
    updatedAt: null,
  },
  {
    id: 2,
    name: "Tomato",
    classification: "Fruits",
    createdAt: new Date().toISOString(),
    updatedAt: null,
  },
  {
    id: 3,
    name: "Lettuce",
    classification: "Leaves",
    createdAt: new Date().toISOString(),
    updatedAt: null,
  },
  {
    id: 4,
    name: "Pumkin",
    classification: "Fruits",
    createdAt: new Date().toISOString(),
    updatedAt: null,
  },
  {
    id: 5,
    name: "Okra",
    classification: "Fruits",
    createdAt: new Date().toISOString(),
    updatedAt: null,
  },
  {
    id: 6,
    name: "Cucumber",
    classification: "Fruits",
    createdAt: new Date().toISOString(),
    updatedAt: null,
  },
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

  const foundVegetable = vegetables.find(
    (vegetable) =>
      vegetable.name.toLocaleLowerCase === body.name.toLocaleLowerCase
  );

  if (foundVegetable) {
    return c.json({ message: "Vegetable already exists" }, 409);
  }

  const newVegetables = [
    ...vegetables,
    {
      ...body,
      id: vegetables[vegetables.length - 1].id + 1,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    },
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

  const foundVegetable = vegetables.find(
    (vegetable) => vegetable.id === Number(id)
  );

  if (!foundVegetable) {
    return c.json({ message: "Vegetable not found" }, 404);
  }

  const newVegetables = vegetables.filter((v) => v.id !== Number(id));

  vegetables = newVegetables;

  return c.json({ message: "Vegetable deleted", newVegetables });
});

// Update a vegetable by id
app.patch("/vegetables/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const foundVegetable = vegetables.find((vegetable) => vegetable.id === id);

  if (!foundVegetable) {
    return c.json({ message: "Vegetable not found" }, 404);
  }

  const body = await c.req.json();

  const updatedVegetables = vegetables.map((vegetable) =>
    vegetable.id === id
      ? { ...vegetable, ...body, updatedAt: new Date().toISOString() }
      : vegetable
  );

  vegetables = updatedVegetables;

  return c.json({ updatedVegetables });
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

  const updatedVegetables = vegetables.map((vegetable) =>
    vegetable.id === id
      ? {
          ...vegetable,
          ...body,
          updatedAt: new Date().toISOString(),
        }
      : vegetable
  );

  vegetables = updatedVegetables;

  return c.json({ updatedVegetables });
});

export default app;
