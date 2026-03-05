from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data.get("username")
        password = data.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None and user.is_staff:
            login(request, user)
            return JsonResponse({"ok": True})
        else:
            return JsonResponse({"ok": False}, status=401)


@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({"ok": True})