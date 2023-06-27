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

test('find single', async () => {
    const response = await request(app)
        .get('/api/v1/service/1/apiRoute/1')
        .expect(200);

    expect(response.body.id).toBe(1);
    expect(response.body.path).toBe('/api/v1/post');
    expect(response.body.method_id).toBe(1);
    expect(response.body.role_id).toBe(5);
    expect(response.body.service_id).toBe(1);
    expect(response.body.route_option_id).toBe(4);
});

test("create new ApiRoute", async () =>{

    const addRequest = {
        path: '/api/v1/post',
        method: 3,
        option_id: 1,
        pathVariable: null
    }

    const response = await request(app)
        .post('/api/v1/service/1/apiRoute')
        .send(addRequest)
        .expect(200);

    expect(response.body.id).toBe(5);
    expect(response.body.path).toBe('/api/v1/post');
    expect(response.body.method_id).toBe(3);
    expect(response.body.role_id).toBe(null);
    expect(response.body.service_id).toBe(1);
    expect(response.body.route_option_id).toBe(1);
})

test("delete single apiRoute", async () =>{

    const response = await request(app)
        .delete('/api/v1/service/1/apiRoute/1')
        .expect(204);

    const result = await sequelize.query("SELECT * FROM API_ROUTE WHERE API_ROUTE_PK = 1", { type: QueryTypes.SELECT })
    expect(result.length).toBe(0);
})

test("update single apiRoute", async () =>{

    const updateRequest = {
        path: '/api/v1/post',
        method: 5,
        option_id: 4,
        role_id: 5,
        pathVariable: null
    }

    const response = await request(app)
        .put('/api/v1/service/1/apiRoute/1')
        .send(updateRequest)
        .expect(200);

    expect(response.body.id).toBe(1);
    expect(response.body.path).toBe('/api/v1/post');
    expect(response.body.method_id).toBe(5);
    expect(response.body.role_id).toBe(5);
    expect(response.body.service_id).toBe(1);
    expect(response.body.route_option_id).toBe(4);
})

test("find all api route with service id", async () =>{

    const response = await request(app)
        .get('/api/v1/service/1/apiRoute')
        .expect(200);

    expect(response.body.length).toBe(2);

    expect(response.body[0].id).toBe(2);
    expect(response.body[0].path).toBe('/api/v1/post');
    expect(response.body[0].method_id).toBe(2);
    expect(response.body[0].role_id).toBe(null);
    expect(response.body[0].service_id).toBe(1);
    expect(response.body[0].route_option_id).toBe(1);

    expect(response.body[1].id).toBe(1);
    expect(response.body[1].path).toBe('/api/v1/post');
    expect(response.body[1].method_id).toBe(1);
    expect(response.body[1].role_id).toBe(5);
    expect(response.body[1].service_id).toBe(1);
    expect(response.body[1].route_option_id).toBe(4);


})