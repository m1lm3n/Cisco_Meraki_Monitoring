# Cisco Meraki Monitoring

A lightweight, browser-based dashboard for monitoring a Cisco Meraki network. It pulls live data from the [Meraki Dashboard API](https://developer.cisco.com/meraki/api-v1/) and shows it in a set of auto-refreshing tables. No build step, no framework: plain HTML, CSS and JavaScript.

## Features

- **Network core devices count** and per-device client tables (switches, access points, appliances, cameras)
- **Network clients**: description, IP, MAC address, switch port, VLAN, traffic sent/received
- **Top clients by usage**: upstream / downstream traffic and share in %
- **Top applications by usage**: total, upstream / downstream and share in %
- **Devices availability**: status of all devices in the organization
- Loading spinners while data is being fetched
- Automatic refresh every 10-15 seconds (randomized interval to avoid synchronized requests)

## Project structure

```
.
├── viera.html          # Main page
├── js/
│   ├── viera_core.js   # API calls and table rendering
│   └── config.js       # Your API key and IDs (NOT committed, see below)
├── css/
│   ├── viera_style.css
│   ├── viera_button.css
│   └── viera_loader.css
└── img/                # Logos and device icons
```

## Meraki API endpoints used

| Purpose | Endpoint |
| --- | --- |
| Devices availability | `GET /organizations/{orgId}/devices/availabilities` |
| Clients of a device | `GET /devices/{serial}/clients` |
| Network clients | `GET /networks/{networkId}/clients` |
| Top clients by usage | `GET /organizations/{orgId}/summary/top/clients/byUsage` |
| Top applications by usage | `GET /organizations/{orgId}/summary/top/applications/byUsage` |

## Getting started

### Prerequisites

- A Meraki Dashboard account with API access enabled
- A Meraki API key (Dashboard → *My profile* → *API access*)
- Your **Organization ID** and **Network ID**
- A local CORS proxy listening on `http://localhost:8080` (the Meraki API does not allow direct browser requests from other origins)
- Any static file server, for example the VS Code *Live Server* extension (the repo is preconfigured for port `5501`)

### 1. Clone the repository

```bash
git clone https://github.com/m1lm3n/Cisco_Meraki_Monitoring.git
cd Cisco_Meraki_Monitoring
```

### 2. Create your config file

Create `js/config.js` and put your own values there:

```js
const apiKey = 'YOUR_MERAKI_API_KEY';
const orgID = 'YOUR_ORGANIZATION_ID';
const netowrkID = 'L_YOUR_NETWORK_ID';
```

`js/config.js` is listed in `.gitignore`, so it will never be committed. Make sure it is loaded **before** `viera_core.js` in `viera.html`:

```html
<script src="js/config.js"></script>
<script src="js/viera_core.js"></script>
```

> Note: the variable name `netowrkID` is spelled this way in the existing code. Keep it as is, or rename it everywhere at once.

### 3. Start the CORS proxy

The dashboard sends requests as `http://localhost:8080/https://api.meraki.com/api/v1/...`, so any proxy that accepts the target URL as part of the path will work, for example [cors-anywhere](https://github.com/Rob--W/cors-anywhere):

```bash
npx cors-anywhere   # or run your own instance on port 8080
```

### 4. Open the dashboard

Serve the folder with Live Server (or any static server) and open `viera.html`, e.g. `http://127.0.0.1:5501/viera.html`.

## Security

**Never commit your API key.**

- Keep the key only in `js/config.js` (git-ignored) or, better, in the proxy / backend.
- Anything loaded by the browser can be read by anyone who can open the page. For production, let the proxy or a backend add the `X-Cisco-Meraki-API-Key` header, so the key never reaches the client.
- If a key was ever committed or shared, revoke it in the Meraki Dashboard and generate a new one.
- Use a **read-only** API key where possible. This project only reads data.

Suggested `.gitignore`:

```
js/config.js
.DS_Store
.vscode/
```

## Customization

- **Refresh interval**: change `min` and `max` (milliseconds) at the top of `js/viera_core.js`.
- **Branding and navigation buttons**: edit `viera.html` and replace the logos in `img/`.
- **Styling**: `css/viera_style.css` (tables, layout), `viera_button.css`, `viera_loader.css`.

## Troubleshooting

| Problem | Likely cause |
| --- | --- |
| Tables stay empty, spinner never stops | CORS proxy is not running on port 8080 |
| `401 Unauthorized` in the browser console | Wrong or revoked API key |
| `404 Not Found` | Wrong Organization ID or Network ID |
| `429 Too Many Requests` | Meraki API rate limit reached; increase the refresh interval |
| `apiKey is not defined` | `config.js` is missing or loaded after `viera_core.js` |

## License

No license specified yet. Add a `LICENSE` file if you plan to share this project.
