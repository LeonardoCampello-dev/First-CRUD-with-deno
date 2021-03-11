import { Iuser } from "../model/user.ts";

let users: Array<Iuser> = [
  {
    id: "1",
    name: "Leonardo Dev",
    email: "leonardodev@gmail.com",
    created_at: new Date("2021-03-01"),
    updated_at: new Date("2021-03-02"),
  },
  {
    id: "2",
    name: "Bianca Trader",
    email: "biancatrader@gmail.com",
    created_at: new Date("2021-03-01"),
    updated_at: new Date("2021-03-02"),
  },
  {
    id: "3",
    name: "Gabriela Radiologia",
    email: "gabrielaradiologia  @gmail.com",
    created_at: new Date("2021-03-01"),
    updated_at: new Date("2021-03-02"),
  },
];

const getUsers = ({ response }: { response: any }) => {
  response.body = users;
  response.status = 200;
};

const getUser = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const { id } = params;
  const user: Iuser | undefined = users.find((user) => user.id === id);

  if (user) {
    response.body = user;
    response.status = 200;
  } else {
    response.body = { message: "User not found" };
    response.status = 404;
  }
};

const addUser = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  const user: Iuser = await body.value;

  users.push(user);

  response.body = { message: "user created successfully" };
  response.status = 200;
};

const updateUser = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  const { id } = params;

  let user: Iuser | undefined = users.find((user) => user.id === id);

  if (user) {
    const body = await request.body();
    const updateUser: { name?: string; email?: string } = await body.value;

    user = { ...user, ...updateUser, updated_at: new Date() };
    users = [...users.filter((user) => user.id !== id), user];

    response.body = { message: "user updated successfully" };
    response.status = 200;
  } else {
    response.body = { message: "user not found" };
    response.status = 404;
  }
};

const deleteUser = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const { id } = params;

  if (id) {
    const userIndex = users.findIndex((user) => user.id === id);
    users.splice(userIndex, 1);

    response.body = { message: "user successfully deleted" };
    response.status = 200;
  } else {
    response.body = { message: "user not found" };
    response.status = 400;
  }
};

export { getUsers, getUser, addUser, updateUser, deleteUser };
