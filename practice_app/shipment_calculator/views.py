from django.http import JsonResponse, HttpResponse


# def calculate_price(request, latitude, longitude, product_id):
def calculate_price(request):

    latitude = request.GET.get('lat', None)
    longitude = request.GET.get('lon', None)
    product_id = request.GET.get('pid', None)

    if (not latitude) or (not longitude) or (not product_id):
        return HttpResponse("Missing Information. Please try to use ...")

    # TODO check the coordinates and product id

    return HttpResponse(f"Your latitude: {latitude}, Your Longitude: {longitude}")
