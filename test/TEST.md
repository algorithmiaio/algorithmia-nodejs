# Running Tests

To run these integration tests you will have to set up an `.env` file with the required environment variables. 

## The .env file

Either create or modify an `.env` file in root directory and add the following keys with its appropiate values.

---

   |Name|Value|Purpose|
   |-|-|-|
   |ALGORITHMIA_TEST_DEFAULT_API_KEY|`<key for Algorithmia api url>`|Required for your algorithmia testing client|
   |ALGORITHMIA_TEST_API_ADDRESS|`<secret key to run Algorithmia api>`|Required for your algorithmia testing client|
   |ALGORITHMIA_TEST_USERNAME|`<your Algorithmia test account username>`|Required to test algorithmia client methods, file uploads, and directory creation|
   |ALGORITHMIA_TEST_ADMIN_API_KEY|`<secret key to your admin Algorithmia account`|Required to test organization read, creation and update|

Normally you'd want `ALGORITHMIA_TEST_API_ADDRES` to be some sort of testing environment. 

## Running tests

To run `all` tests, simply run:

```bash
npm test
```

To run a `single` file, run:

```bash
npm test <fileName>.test.ts
```

Note that if you run the tests without environment variables the test suite will prompt you to read this file and set the variables mentioned above.
