const app = require("../app");

const {createData,clearData} = require("./utlis/dataController");
const request = require("supertest")
const sequelize  = require("../config/database.config");
const {QueryTypes} = require("sequelize");
require('iconv-lite').encodingExists('foo');

beforeEach(async () => {
    await createData();
});

afterEach(async () => {
    await clearData();
});

test("create new service", async () => {

    const addRequest = {
        name: "test new service",
        index: "this is test service",
        domain: "http://test.com",
    }

    const response = await request(app)
        .post("/api/v1/service")
        .send(addRequest)
        .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.id).toBe(3);
    expect(response.body.name).toBe(addRequest.name);
    expect(response.body.index).toBe(addRequest.index);
    expect(response.body.domain).toBe(addRequest.domain);
});

test("get single service", async () => {
    const response = await request(app)
        .get("/api/v1/service/1")
        .send()
        .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe("test");
    expect(response.body.index).toBe("test");
    expect(response.body.domain).toBe("http://localhost:3000");
});

test("get services", async () => {
    const response = await request(app)
        .get("/api/v1/service")
        .send()
        .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.length).toBe(2);

    expect(response.body[0].id).toBe(2);
    expect(response.body[0].name).toBe("test2");
    expect(response.body[0].index).toBe("test2");
    expect(response.body[0].domain).toBe("http://localhost:3001");

    expect(response.body[1].id).toBe(1);
    expect(response.body[1].name).toBe("test");
    expect(response.body[1].index).toBe("test");
    expect(response.body[1].domain).toBe("http://localhost:3000");
});

test("update service", async () =>{

    const updateRequest = {
        name: "test update service",
        index: "this is test update service",
        domain: "http://test.com",
    }

    const response = await request(app)
        .put("/api/v1/service/1")
        .send(updateRequest)
        .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe(updateRequest.name);
    expect(response.body.index).toBe(updateRequest.index);
    expect(response.body.domain).toBe(updateRequest.domain);
});

test("delete service", async () => {

    const response = await request(app)
        .delete("/api/v1/service/1")
        .send()
        .expect(204);

    const service = await sequelize.query("SELECT * FROM SERVICE WHERE SERVICE_PK = 1", {type: QueryTypes.SELECT});
    expect(service.length).toBe(0);
});