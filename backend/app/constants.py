from starlette_discord import DiscordOAuthClient

client_id = "914611963064123442"
client_secret = "Zo9_emMAoc98BLg5WqaDioc-_qL02atF"
redirect_url = "https://localhost:5000/api/1/callback"

discord_client = DiscordOAuthClient(client_id=client_id,
                                    client_secret=client_secret,
                                    redirect_uri=redirect_url)

BCRYPT_SALT = b'$2b$12$yhIMqLykEWvrgaSTz9tgyu'
