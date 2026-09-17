from decimal import Decimal, ROUND_HALF_UP
from pydantic import BaseModel, Field, ConfigDict

SOURCE = "https://pmfby.gov.in/pdf/Revamped%20Operational%20Guidelines_17th%20August%202020.pdf"
class ClaimInputs(BaseModel):
    model_config = ConfigDict(allow_inf_nan=False)
    policy_reference: str = Field(min_length=1, max_length=150)
    insurance_unit: str = Field(min_length=1, max_length=150)
    season: str = Field(min_length=1, max_length=100)
    sum_insured: Decimal = Field(gt=0, le=1000000000, max_digits=12, decimal_places=2)
    threshold_yield: Decimal = Field(gt=0, le=1000000)
    actual_yield: Decimal = Field(ge=0, le=1000000)

def estimate_claim(data):
    shortfall = max(Decimal(0), (data.threshold_yield - data.actual_yield) / data.threshold_yield)
    amount = (shortfall * data.sum_insured).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    return {"amount": float(amount), "loss_percent": round(float(shortfall * 100), 2),
            "explanation": f"max(0, ({data.threshold_yield} - {data.actual_yield}) / {data.threshold_yield}) x INR {data.sum_insured} = INR {amount}. The yield shortfall is {shortfall:.2%}; image severity is not used as a payout percentage.",
            "status": "Provisional yield-loss estimate; subject to insurer verification",
            "inputs": data.model_dump(mode="json"), "source": SOURCE}

def explain_scan(scan):
    return (f"The saved AI result classifies {scan.crop_type or 'the crop'} at {scan.stage or 'an unspecified stage'} as {scan.stress_class or 'unspecified stress'}, "
            f"with {scan.severity_label or 'unspecified'} severity (model score: {scan.severity}) and image quality {scan.quality or 'unspecified'}. "
            f"The recorded stress confidence is {scan.stress_confidence}. These model outputs support the damage flag, but do not establish field-wide yield loss or the cause of damage. "
            "This is a summary of the saved AI outputs; original visual evidence and model reasoning were not retained. Verify findings with a field assessment before insurance review.")
