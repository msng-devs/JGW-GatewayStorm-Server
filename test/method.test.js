const app = require("../app");
const request = require("supertest")

test("get all roles", async () => {
    const response =
        await request(app)
            .get("/api/v1/method")
            .expect(200)

    expect(response.body.length).toBe(5)

    expect(response.body[0].id).toBe(1)
    expect(response.body[0].name).toBe("GET")

    expect(response.body[1].id).toBe(2)
    expect(response.body[1].name).toBe("POST")

    expect(response.body[2].id).toBe(3)
    expect(response.body[2].name).toBe("PUT")

    expect(response.body[3].id).toBe(4)
    expect(response.body[3].name).toBe("DELETE")

    expect(response.body[4].id).toBe(5)
    expect(response.body[4].name).toBe("PATCH")
})