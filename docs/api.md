# API coverage

Which Open Pharmacy API endpoints the web uses, and where. Checked against
the test API on 2026-11-06.

| Endpoint                                         | Used by                                                                                |
| ------------------------------------------------ | -------------------------------------------------------------------------------------- |
| `POST /token`                                    | every call (app token, `src/lib/api/op/client.ts`)                                     |
| `GET /user/v1/version/verification`              | `GET /api/app/version` → "Update required"                                             |
| `POST /identity/v1/signup`                       | `POST /api/auth/register`                                                              |
| `POST /identity/v1/signin`                       | `POST /api/auth/login`                                                                 |
| `POST /identity/v1/signout`                      | `POST /api/auth/logout`                                                                |
| `POST /identity/v1/refresh-token`                | `src/proxy.ts`, before the ID token expires                                            |
| `POST /identity/v1/third_party_auth_login`       | `POST /api/auth/google`, `POST /api/auth/apple` (needs the client ids, see the README) |
| `POST /identity/v1/send-verification-email`      | after sign-up, `POST /api/auth/resend-verification`, after a change of email           |
| `POST /identity/v1/verify-email`                 | `POST /api/auth/verify-email`                                                          |
| `POST /identity/v1/check-email-verification`     | `GET /api/auth/email-status` (the "verify your email" banner)                          |
| `POST /identity/v1/send-password-reset-email`    | `POST /api/auth/forgot-password`                                                       |
| `POST /identity/v1/reset-password`               | `POST /api/auth/reset-password`                                                        |
| `GET /user/v1/get_user_details`                  | Edit Profile                                                                           |
| `POST /identity/v1/change_user_details`          | `POST /api/account/profile`                                                            |
| `POST /identity/v1/change-password`              | `POST /api/account/password`                                                           |
| `POST /identity/v1/change-email`                 | `POST /api/account/email`                                                              |
| `POST /identity/v1/deactivate_account`           | `POST /api/account/deactivate`                                                         |
| `POST /identity/v1/delete_account`               | `POST /api/account/delete`                                                             |
| `GET /user/v1/escripts/`                         | My Scripts, script details, Home, Account                                              |
| `POST /government/v1/barcode/medication-request` | `POST /api/scripts/add` (add by token)                                                 |
| `POST /government/v1/token-exchange`             | every ASL call (MySL token) and Connect ASL                                            |
| `POST /government/v1/mysl/medication-request`    | Connect ASL, after a hide or show, the background sync                                 |
| `PUT /government/v1/mysl/visibility-status`      | `POST /api/scripts/hide` (hide and unhide)                                             |
| `POST /government/v1/mysl/update-scid-note`      | `POST /api/scripts/note`                                                               |
| `POST /user/v1/script/delete`                    | `POST /api/scripts/delete`                                                             |
| `POST /user/v1/refresh/`                         | `POST /api/scripts/sync` (the background sync)                                         |

Not used: `POST /identity/v1/third_party_user_check` (sign-in with Google or
Apple already creates the account), `POST /stay-alive` and `GET /`.

## Behaviour worth knowing

- Email verification is not required by the API. The web lets an unverified
  user in and shows a banner on Home and Account.
- `change-email` accepts the current address and marks it unverified, so the
  web refuses it before calling the API.
- `/user/v1/refresh/` takes about 9 s the first time for an ASL account, and
  answers 404 "User has no scripts" when there is nothing to do. The web
  treats that 404 as done.
- The ASL pull and the refresh write different text for the same ASL
  scripts (the patient name and most medication names). The first sync after
  Connect ASL renames them, and the last writer wins.
- The 4-digit password-reset code has no limit on wrong tries.
