import os
import uvicorn

if __name__ == "__main__":
    port_env = os.environ.get("PORT", "8000")
    try:
        port = int(port_env)
    except ValueError:
        port = 8000

    print(f"Starting ChefMachines server on 0.0.0.0:{port}...")
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=port, proxy_headers=True, forwarded_allow_ips="*")
