import os
import sys
import django

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Setup django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.local')
django.setup()

from apps.inventory.services.stock_issue_service import ItemIssueService
from apps.inventory.models.item_issue import ItemIssue

try:
    payload = {
        "item_id": 1,
        "issue_to": 4,
        "quantity": 1,
        "issue_date": "2026-07-30",
        "note": ""
    }
    row = ItemIssueService().issue(payload, issue_by=1)
    print("SUCCESS! Created ItemIssue ID:", row.id)
except Exception as e:
    import traceback
    traceback.print_exc()
