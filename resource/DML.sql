INSERT INTO SERVICE (SERVICE_PK, SERVICE_NM, SERVICE_DOMAIN, SERVICE_INDEX)
VALUES  (1, 'test', 'http://localhost:3000', 'test'),
        (2, 'test2', 'http://localhost:3001', 'test2');

INSERT INTO API_ROUTE (API_ROUTE_PK, API_ROUTE_PATH, METHOD_METHOD_PK, ROLE_ROLE_PK, SERVICE_SERVICE_PK, ROUTE_OPTION_ROUTE_OPTION_PK)
VALUES  (1, '/api/v1/post', 1, 5, 1, 4),
        (2, '/api/v1/post', 2, NULL, 1, 1),
        (3, '/api/v1/member', 4, NULL, 2, 1),
        (4, '/api/v1/member', 3, NULL, 2, 3);






