## ID-REGION: Simple Open API Wilayah Indonesia

API ini hanya terdiri dari daftar Provinsi dan Daftar Kota/Kabupaten berdasarkan provinsi yang di pilih.

## Fitur
 - Caching Data dengan Redis

## First Thing First

<details>
<summary> Build data statis</summary>

```sh
npm run build:model
```
</details>

<details>
<summary>Running the app</summary>
<br>

```sh
npm start
```

Docker

```sh
docker compose up -d
```


</details>

<br>

> [!NOTE]
>
> Dengan docker kamu tidak perlu menggunakan `npm run build:model` lagi, semua sudah di lakukan oleh Dockerfile


## API Documentations

```sh
http://hostname:4000/api-docs
```





