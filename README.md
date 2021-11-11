# Environment Specific Variables Action :books:

Determine variables based on a specified environment.

## Usage

```yaml
- uses: fdev/env-specific-vars-action@v1
  with:
    environment: production
    export: true
  env:
    DEFAULT_API_URL: https://dev.api.example.org
    ACCEPTANCE_API_URL: https://acc.api.example.org
    PRODUCTION_API_URL: https://prod.api.example.org
    
    DEFAULT_DEBUG_ENABLED: false
    DEVELOP_DEBUG_ENABLED: true

    DEVELOP_DISABLE_SANDBOX: true
```

Since the specified environment is `production`, only passed environment variables that start with `PRODUCTION_` or `DEFAULT_` will be exported without the prefix. Matching is not case sensitive.

The example above will yield the following variables:

```yaml
API_URL: https://prod.api.example.org
DEBUG_ENABLED: false
```

Had we specified environment `develop`, then it would have yielded the following variables:

```yaml
API_URL: https://dev.api.example.org
DEBUG_ENABLED: true
DISABLE_SANDBOX: true
```


## Inputs

| Name          | Description                                                  | Default |      Required      |
|---------------|--------------------------------------------------------------|---------|:------------------:|
| `environment` | Name of the environment (e.g. `production` or `acceptance`). |         | :heavy_check_mark: |
| `export`      | Should the result be exported as environment variables.      | `true`  |        :x:         |


## Outputs

All resulting variables will be added as an output.
