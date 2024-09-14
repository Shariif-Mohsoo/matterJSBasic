const { World, Engine, Render, Runner, Bodies, Mouse, MouseConstraint } =
  Matter;
// 1st create the engine
const engine = Engine.create();
//2nd destructure the world object from engine
const { world } = engine;
//3d create the render and tell the Render object where to show the element in html.
const height = 600;
const width = 800;
const render = Render.create({
  element: document.body,
  engine,
  options: {
    width,
    height,
    wireframes: false,
  },
});
//run the render
Render.run(render);
Runner.run(Runner.create(), engine);
//UNTIL NOW OUR WORLD IS CREATED.
//NEXT STEPS
//Create the body which ever you want.
//x = 200, y = 200, width: 50, height:50
// const shape = Bodies.rectangle(200, 200, 50, 50, {
//   isStatic: true,
// });
//Now add the shape to the world.
//World.add(world, shape);
/*
 * POINT TO BE NOTICED 
    by default there will be wireframes mode enable so
    we can only see the outline of any body, after disabling it
    we will get the style. 
    TO DISABLES THIS
    Go to Render.create() and then in options object do wireframes:false
    WHAT FOR OUR OWN STYLE?
    Go the body which you create and then in options object add
    {
        isStatic:true,
        render:
        {
            fillStyle:"color"
        }
    }
 */

//WALLS
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true }),
];
World.add(world, walls);

//RANDOM SHAPES
for (let i = 0; i < 40; i++) {
  if (Math.random() < 0.5)
    World.add(
      world,
      Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50)
    );
  else if (Math.random() > 0.8)
    World.add(
      world,
      Bodies.rectangle(Math.random() * width, Math.random() * height, 20, 50, {
        render: {
          fillStyle: "violet",
        },
      })
    );
  else
    World.add(
      world,
      Bodies.circle(Math.random() * width, Math.random() * height, 35)
    );
}

//Adding the effect to world inner bodies to be click able.
World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
  })
);
