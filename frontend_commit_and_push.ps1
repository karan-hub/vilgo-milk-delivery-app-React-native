Write-Host "Starting commit & push process..." -ForegroundColor Green
Set-Location (git rev-parse --show-toplevel)
$ErrorActionPreference = "Stop"

# Helper: reset index before every commit
function Reset-Index {
    git reset | Out-Null
}

# ===============================
# COMMIT 1 – Subscription API updates
# ===============================
Reset-Index
git add api/subscriptionApi.ts
git commit -m "feat(api): update subscription APIs for custom subscription flow"
Write-Host "Commit 1 done" -ForegroundColor Green


# ===============================
# COMMIT 2 – Subscription payment screen
# ===============================
Reset-Index
git add app/subscribe/payment.tsx
git commit -m "feat(screen): update subscription payment flow"
Write-Host "Commit 2 done" -ForegroundColor Green


# ===============================
# COMMIT 3 – Order card UI update
# ===============================
Reset-Index
git add components/OrderCard.tsx
git commit -m "refactor(ui): update OrderCard for subscription changes"
Write-Host "Commit 3 done" -ForegroundColor Green


# ===============================
# COMMIT 4 – Remove legacy shared components
# ===============================
Reset-Index
git rm components/DateInpute.tsx `
       components/OfferCard.tsx `
       components/QuantitySelector.tsx
git commit -m "chore(ui): remove unused legacy components"
Write-Host "Commit 4 done" -ForegroundColor Green


# ===============================
# COMMIT 5 – Remove legacy subscription components
# ===============================
Reset-Index
git rm `
components/subscription/DaySelector.tsx `
components/subscription/UnitsPerDay.tsx
git commit -m "chore(subscription): remove deprecated subscription components"
Write-Host "Commit 5 done" -ForegroundColor Green


# ===============================
# COMMIT 6 – Move DateInpute to subscription scope
# ===============================
Reset-Index
git add components/subscription/DateInpute.tsx
git commit -m "refactor(subscription): move DateInpute into subscription module"
Write-Host "Commit 6 done" -ForegroundColor Green


# ===============================
# COMMIT 7 – Move QuantitySelector to subscription scope
# ===============================
Reset-Index
git add components/subscription/QuantitySelector.tsx
git commit -m "refactor(subscription): move QuantitySelector into subscription module"
Write-Host "Commit 7 done" -ForegroundColor Green


# ===============================
# COMMIT 8 – CustomSubscription component refactor
# ===============================
Reset-Index
git add components/subscription/CustomSubscription.tsx
git commit -m "feat(subscription): refactor CustomSubscription component"
Write-Host "Commit 8 done" -ForegroundColor Green


# ===============================
# COMMIT 9 – Predefined plan card update
# ===============================
Reset-Index
git add components/subscription/PredefinedPlanCard.tsx
git commit -m "refactor(subscription): update PredefinedPlanCard UI logic"
Write-Host "Commit 9 done" -ForegroundColor Green


# ===============================
# COMMIT 10 – Subscription request types
# ===============================
Reset-Index
git add types/SubscriptionRequest.ts
git commit -m "refactor(types): align SubscriptionRequest with backend changes"
Write-Host "Commit 10 done" -ForegroundColor Green


# ===============================
# COMMIT 11 – Pricing logic extraction
# ===============================
Reset-Index
git rm utils/subscriptionPricing.ts
git add utils/calculateCustomPrice.ts
git commit -m "refactor(pricing): extract custom subscription pricing logic"
Write-Host "Commit 11 done" -ForegroundColor Green


# ===============================
# COMMIT 12 – Tooling & Postman collection
# ===============================
Reset-Index
git add `
frontend_commit_and_push.ps1 `
Data/Villager Milks.postman_collection.json
git commit -m "chore(dev): add frontend automation script and Postman collection"
Write-Host "Commit 12 done" -ForegroundColor Green


# ===============================
# PUSH
# ===============================
git push origin main
Write-Host "All frontend commits created and pushed successfully." -ForegroundColor Cyan
