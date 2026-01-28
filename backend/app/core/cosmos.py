from azure.cosmos import CosmosClient, PartitionKey
from app.core.config import settings

client = CosmosClient(settings.COSMOS_ENDPOINT, settings.COSMOS_KEY)
database = client.create_database_if_not_exists(settings.COSMOS_DATABASE)
container = database.create_container_if_not_exists(
    id=settings.COSMOS_CONTAINER,
    partition_key=PartitionKey(path="/id"),
    offer_throughput=400
)
