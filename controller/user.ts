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
    response.status = 200;
    response.body = user;
  } else {
    response.status = 404;
    response.body = { message: "User not found" };
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
  const user: Iuser = body.value;

  users.push(user);

  response.body = { message: "OK" };
  response.status = 200;
};

export { getUsers, getUser, addUser };
