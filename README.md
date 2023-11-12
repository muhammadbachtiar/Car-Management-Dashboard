# Car Management Dashboard

Car Management Dashboard API and Website.

## ERD

![ERD_IMAGE](./Erd.png)

## EndPoint

### API

- [GET] http://localhost:3000/api/v1/cars => Show list cars data
- [GET] http://localhost:3000/api/v1/cars?name=name_filter_value => Show list cars data by name filter.
- [GET] http://localhost:3000/api/v1/cars/:id => Show car data by ID
- [POST] http://localhost:3000/api/v1/cars => Add new car data
- [PUT] http://localhost:3000/api/v1/cars/:id => Update car data
- [DELETE] http://localhost:3000/api/v1/cars/:id => Delete car data by ID

#### REQ & RES GET LIST
![get-list](./getList.png)

#### REQ & RES FILTER BY NAME
![filter-by-name](./filterByName.png)

#### REQ & RES GET BY ID
![get-by-id](./filterById.png)

#### REQ & RES POST DATA
![post-data](./createCar.png)

#### REQ & RES PUT DATA
![put-data](./updateCar.png)

#### REQ & RES DELETE DATA
![delete-data](./deleteCar.png)

### VIEW

- [GET] http://localhost:3000/v1/cars => Show list cars data
- [GET] http://localhost:3000/v1/cars?brand=:carBrand => Show list cars data by brand filter.
- [GET] http://localhost:3000/v1/cars/:id => Show car data by ID
- [POST] http://localhost:3000/v1/cars/add => Add new car data
- [PUT] http://localhost:3000/v1/cars/:id => Update car data
- [DELETE] http://localhost:3000/v1/cars/:id Delete car data by ID

### VIEW WEBSITE

![view-website](./vieExample.png)

