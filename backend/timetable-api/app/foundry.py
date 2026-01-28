from openai import OpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider


def get_agent(
    project_name: str, app_name: str, foundry_resource_name: str = "tmcw-foundry"
):
    """
    Returns an OpenAI agent client for the specified project and app.
    """
    return OpenAI(
        api_key=get_bearer_token_provider(
            DefaultAzureCredential(), "https://ai.azure.com/.default"
        ),
        base_url=f"https://{foundry_resource_name}.services.ai.azure.com/api/projects/{project_name}/applications/{app_name}/protocols/openai",
        default_query={"api-version": "2025-11-15-preview"},
    )


def call_model(project_name: str, app_name: str, prompt: str):
    agent = get_agent(project_name, app_name)
    response = agent.responses.create(
        input=prompt,
    )
    return response
