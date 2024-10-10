# API Documentation

Bu belge, mevcut API uç noktalarını ve bunların işlevlerini açıklamaktadır.

## Genel Bilgiler

- **Base URL:** `/api`

### Authentication
API uç noktalarını kullanabilmek için `Auth` uç noktalarını kullanarak oturum açmalı ve uygun yetkilere sahip olmalısınız.

## Uç Noktalar

### ApplicationServices
- **GET** `/ApplicationServices/get-all-endpoints`: Tüm uygulama hizmet uç noktalarını alır.
![image](https://github.com/user-attachments/assets/596daba3-b71d-4bd5-947e-895f2f7d64e9)


### Auth
- **POST** `/Auth/Login`: Kullanıcı girişi yapar.
- **POST** `/Auth/RefreshLogin`: Giriş yenileme işlemi yapar.
- **POST** `/Auth/Verify-reset-token`: Şifre sıfırlama işlemi için token doğrulaması yapar.
![image](https://github.com/user-attachments/assets/16885168-2577-40e0-8e69-bff9308fffda)


### AuthorizationEndpoints
- **POST** `/AuthorizationEndpoints/GetRolesEndpoint`: Roller için uç noktalar alır.
- **POST** `/AuthorizationEndpoints/AssignRoleToEndpoint`: Belirtilen role uç nokta ataması yapar.
![image](https://github.com/user-attachments/assets/5539d020-8bec-412b-b5f9-8289ce936ff7)


### CarBrands
- **GET** `/CarBrands/get-all-car-brands`: Tüm araba markalarını alır.
- **GET** `/CarBrands/get-by-id-car-brand/{CarBrandId}`: Belirtilen ID'ye sahip araba markasını getirir.
- **POST** `/CarBrands/add-car-brand`: Yeni bir araba markası ekler.
- **PUT** `/CarBrands/update-car-brand`: Mevcut bir araba markasını günceller.
- **DELETE** `/CarBrands/delete-car-brand/{CarBrandId}`: Belirtilen ID'ye sahip araba markasını siler.
![image](https://github.com/user-attachments/assets/baa5867a-b8c4-46fa-9f2b-a3dd54b3714a)


### CarEngineTypes
- **GET** `/CarEngineTypes/get-all-car-engine-types`: Tüm araba motor türlerini alır.
- **GET** `/CarEngineTypes/get-by-id-car-engine-type/{CarEngineTypeId}`: Belirtilen ID'ye sahip araba motor türünü getirir.
- **POST** `/CarEngineTypes/add-car-engine-type`: Yeni bir araba motor türü ekler.
- **PUT** `/CarEngineTypes/update-car-engine-type`: Mevcut bir araba motor türünü günceller.
- **DELETE** `/CarEngineTypes/delete-car-engine-type/{CarEngineTypeId}`: Belirtilen ID'ye sahip araba motor türünü siler.
![image](https://github.com/user-attachments/assets/50413f57-38e9-41f7-8785-815793962dd4)


### CarModels
- **GET** `/CarModels/get-all-car-models`: Tüm araba modellerini alır.
- **GET** `/CarModels/get-by-id-car-model/{CarModelId}`: Belirtilen ID'ye sahip araba modelini getirir.
- **GET** `/CarModels/get-car-models-by-brand-id/{CarBrandId}`: Belirtilen marka ID'sine sahip araba modellerini getirir.
- **POST** `/CarModels/add-car-model`: Yeni bir araba modeli ekler.
- **PUT** `/CarModels/update-car-model`: Mevcut bir araba modelini günceller.
- **DELETE** `/CarModels/delete-car-model/{CarModelId}`: Belirtilen ID'ye sahip araba modelini siler.
![image](https://github.com/user-attachments/assets/44653c23-7f04-4d8b-a23b-3f6bd50feb55)


### Cars
- **POST** `/Cars/add-car`: Yeni bir araba ekler.
- **GET** `/Cars/get-all-cars`: Tüm arabaları getirir.
- **GET** `/Cars/get-by-id-car/{carId}`: Belirtilen ID'ye sahip arabayı getirir.
- **GET** `/Cars/get-all-by-passive-or-active`: Aktif veya pasif tüm arabaları getirir.
- **PUT** `/Cars/change-car-passive`: Belirtilen arabayı pasif yapar.
- **PUT** `/Cars/update-car`: Mevcut bir arabayı günceller.
- **POST** `/Cars/upload-file-car`: Arabaya dosya yükler.
- **DELETE** `/Cars/delete-file-car/{ImageId}`: Belirtilen ID'ye sahip araba dosyasını siler.
![image](https://github.com/user-attachments/assets/554bbc88-9248-42b3-a20d-eff2544a4fe4)


### Companies
- **GET** `/Companies/get-all-companies`: Tüm şirketleri alır.
- **GET** `/Companies/get-by-id-company/{CompanyId}`: Belirtilen ID'ye sahip şirketi getirir.
- **POST** `/Companies/add-company`: Yeni bir şirket ekler.
- **PUT** `/Companies/update-company`: Mevcut bir şirketi günceller.
- **DELETE** `/Companies/delete-company/{CompanyId}`: Belirtilen ID'ye sahip şirketi siler.
![image](https://github.com/user-attachments/assets/2dc1149f-7f57-41af-8af3-5cbe84c82389)


### CarTypes
- **GET** `/CarTypes/get-all-car-types`: Tüm araç tiplerini alır.
- **GET** `/CarTypes/get-by-id-car-type/{CarTypeId}`: Belirtilen ID'ye sahip araç tipini getirir.
- **POST** `/CarTypes/add-car-type`: Yeni bir araç tipi ekler.
- **PUT** `/CarTypes/update-car-type/{CarTypeId}`: Mevcut bir araç tipini günceller.
- **DELETE** `/CarTypes/delete-car-type/{CarTypeId}`: elirtilen ID'ye sahip araç tipini siler.
![image](https://github.com/user-attachments/assets/4778e8b0-a8cd-410c-b316-48b700a6ef29)


### Files
- **GET** `/Files/GetBossStorageApi`: Dosya depolama işlemlerini gerçekleştirir.
![image](https://github.com/user-attachments/assets/4df43f59-d058-4850-b167-514b57dceb17)


### Locations
- **GET** `/Locations/get-all-locations`: Tüm lokasyonları getirir.
- **GET** `/Locations/get-by-id-location/{LocationId}`: Belirtilen ID'ye sahip lokasyonu getirir.
- **POST** `/Locations/add-location`: Yeni bir lokasyon ekler.
- **PUT** `/Locations/update-location/{LocationId}`: Mevcut bir lokasyonu günceller.
- **DELETE** `/Locations/delete-location/{LocationId}`: Belirtilen ID'ye sahip lokasyonu siler.
![image](https://github.com/user-attachments/assets/3db2160d-b754-41e7-83fd-dadd79c7a714)


### Roles
- **GET** `/Roles/get-all-roles`: Tüm rolleri alır.
- **GET** `/Roles/get-by-id-role/{RoleId}`: Belirtilen ID'ye sahip rolü getirir.
- **POST** `/Roles/add-role`: Yeni bir rol ekler.
- **PUT** `/Roles/update-role/{RoleId}`: Mevcut bir rolü günceller.
- **DELETE** `/Roles/delete-role/{RoleId}`: Belirtilen ID'ye sahip rolü siler.
![image](https://github.com/user-attachments/assets/8bee6788-c94f-4a24-b590-c886b16abcab)


### Users
- **POST** `/Users/create-user`: Yeni bir kullanıcı oluşturur.
- **GET** `/Users/get-all-users`: Tüm kullanıcıları getirir.
- **POST** `/Users/assign-roles-to-user/{UserId}`: Belirtilen kullanıcıya roller atar.
- **GET** `/Users/get-by-id-user/{UserId}`: Belirtilen ID'ye sahip kullanıcıyı getirir.
- **GET** `/Users/get-by-user-name/{UserName}`: Belirtilen kullanıcı adına sahip kullanıcıyı getirir.
- **GET** `/Users/check-user-name-exists/{UserName}`: Kullanıcı adı varlığını kontrol eder.
- **POST** `/Users/assign-role-to-user`: Kullanıcıya rol atar.
- **POST** `/Users/upload-file-user`: Kullanıcıya dosya yükler.
- **DELETE** `/Users/delete-file-user/{ImageId}`: Belirtilen ID'ye sahip kullanıcı dosyasını siler.
![image](https://github.com/user-attachments/assets/80ee4f4c-f92b-4060-9c3c-e022cf76b9c0)


## Schemas
- Çeşitli isteklerde kullanılan komut ve veri yapıları:
  - **AssignRoleEndpointCommandRequest**
  - **AssignRoleToUserCommandRequest**
  - **CallingConventions**
  - **ConstructInfo**
  - **CreateCarBrandCommandRequest**
  - **CreateCarEngineTypeCommandRequest**
  - **CreateCarModelCommandRequest**
  - **CreateCompanyCommandRequest**
  - **CreateLocationCommandRequest**
  - **CreateRoleCommandRequest**
  - **CreateUserCommandRequest**
  - **DeleteCarBrandCommandRequest**
  - **DeleteCarEngineTypeCommandRequest**
  - **DeleteCarModelCommandRequest**
  - **DeleteCompanyCommandRequest**
  - **DeleteLocationCommandRequest**
  - **DeleteRoleCommandRequest**
  - **DeleteUserCommandRequest**
  - **GetRolesCommandRequest**
  - **UpdateCarBrandCommandRequest**
  - **UpdateCarEngineTypeCommandRequest**
  - **UpdateCarModelCommandRequest**
  - **UpdateCompanyCommandRequest**
  - **UpdateLocationCommandRequest**
  - **UpdateRoleCommandRequest**
  - **UpdateUserCommandRequest**

## Örnek Kullanım

Aşağıda, bir API çağrısı yapmak için örnek bir kullanım yer almaktadır:

### Auth

- curl -X POST "https://your-api-base-url/api/Auth/Login" \
-H "Content-Type: application/json" \
-d '{"username": "your-username", "password": "your-password"}'

- curl -X POST "https://your-api-base-url/api/Auth/RefreshLogin" \
-H "Content-Type: application/json" \
-d '{"refreshToken": "your-refresh-token"}'

- curl -X POST "https://your-api-base-url/api/Auth/Verify-reset-token" \
-H "Content-Type: application/json" \
-d '{"token": "your-reset-token"}'

### CarBrands

- curl -X GET "https://your-api-base-url/api/CarBrands/get-all-car-brands" \
-H "Authorization: Bearer your-access-token"

- curl -X GET "https://your-api-base-url/api/CarBrands/get-by-id-car-brand/your-CarBrandId" \
-H "Authorization: Bearer your-access-token"

- curl -X POST "https://your-api-base-url/api/CarBrands/add-car-brand" \
-H "Authorization: Bearer your-access-token" \
-H "Content-Type: application/json" \
-d '{"name": "BrandName"}'

- curl -X PUT "https://your-api-base-url/api/CarBrands/update-car-brand" \
-H "Authorization: Bearer your-access-token" \
-H "Content-Type: application/json" \
-d '{"id": "your-CarBrandId", "name": "UpdatedBrandName"}'

- curl -X DELETE "https://your-api-base-url/api/CarBrands/delete-car-brand/your-CarBrandId" \
-H "Authorization: Bearer your-access-token"

### CarModels

- curl -X GET "https://your-api-base-url/api/CarModels/get-all-car-models" \
-H "Authorization: Bearer your-access-token"

- curl -X GET "https://your-api-base-url/api/CarModels/get-by-id-car-model/your-CarModelId" \
-H "Authorization: Bearer your-access-token"

- curl -X GET "https://your-api-base-url/api/CarModels/get-car-models-by-brand-id/your-CarBrandId" \
-H "Authorization: Bearer your-access-token"

- curl -X POST "https://your-api-base-url/api/CarModels/add-car-model" \
-H "Authorization: Bearer your-access-token" \
-H "Content-Type: application/json" \
-d '{"brandId": "your-CarBrandId", "modelName": "ModelName"}'

- curl -X PUT "https://your-api-base-url/api/CarModels/update-car-model" \
-H "Authorization: Bearer your-access-token" \
-H "Content-Type: application/json" \
-d '{"id": "your-CarModelId", "brandId": "your-CarBrandId", "modelName": "UpdatedModelName"}'

- curl -X DELETE "https://your-api-base-url/api/CarModels/delete-car-model/your-CarModelId" \
-H "Authorization: Bearer your-access-token"
