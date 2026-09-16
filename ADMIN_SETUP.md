# Bank administration

The separate portal is `/admin`, with bank login at `/admin/login`. Only the database Admin role can call admin APIs. Public registration always creates a Farmer. Existing browser sessions must sign in again after this update.

From `app-backend`, an authorized system operator can provision an existing registered account with:

```powershell
python provision_admin.py representative@example.com
```

No account is promoted automatically. Verify the representative before running this command. Configure a strong random `SECRET_KEY` in the backend environment for stable sessions across restarts/workers. Without a configured key, development uses an ephemeral key. Passwords are hashed on registration; old plaintext passwords are upgraded after successful login.

The portal searches all registered profiles and paginates their saved scans. It summarizes retained AI classifications without inventing image observations. Historical records store image filenames, not image bytes or original model reasoning, so the portal cannot display historical photos or recover those observations. New scans preserve the model?s short explanation in a separate scan_explanations table; restart the application backend to create it and restart the ML backend to return the explanation.

Reports calculate provisional area-based yield-loss claims using `max(0, (threshold yield - actual yield) / threshold yield) * total sum insured`. Enter official yields in the same units for the notified insurance unit/crop/season and the policy sum insured for the covered area. Image severity is not a payout percentage. Localized loss, post-harvest and prevented-sowing assessment are outside this calculator. Verify current state notification, enrollment, evidence and prior payments with the insurer before settlement.

Source: https://pmfby.gov.in/pdf/Revamped%20Operational%20Guidelines_17th%20August%202020.pdf (section 21.2). Current scheme downloads: https://pmfby.gov.in/downloads

Inputs and estimates are not persisted: download the text report to retain the entered policy details, AI summary and calculation. Saved scan records remain in the existing database. The existing tables are unchanged; startup creates the new scan_explanations table. The database account needs CREATE TABLE permission for the first startup.

Validation:

```powershell
cd frontend
npm run build
npm run lint
```

From `app-backend` (install test dependencies with `python -m pip install -r requirements-dev.txt`):

```powershell
python -m unittest discover -s tests -v
```
