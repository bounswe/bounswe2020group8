from django.http import JsonResponse, HttpResponse


# def calculate_price(request, latitude, longitude, product_id):
def calculate_price(request):
    latitude = request.GET.get('lat', None)
    longitude = request.GET.get('lon', None)
    product_id = request.GET.get('pid', None)

    if (not latitude) or (not longitude) or (not product_id):
        return HttpResponse("Missing Information. Please try to use the following format: "
                            "url_here/?lat=\"Latitude\"&lon=\"Longitude\"&pid=\"Product_ID\"/")

    try:
        latitude = float(latitude)
        longitude = float(latitude)
    except ValueError:
        return HttpResponse("Make sure that latitude and longitude are given as float number. Ex: lat=14.23&lon=41.12")

    if not (-90 <= latitude <= 90):
        return HttpResponse("Given Latitude is not in range of [-90, 90]")

    if not (-180 <= longitude <= 180):
        return HttpResponse("Given Longitude is not in range of [-180, 180]")

    # if can not find product:
    #     return HttpResponse("Product_ID is invalid.")

    return HttpResponse(f"Your latitude: {latitude}, Your Longitude: {longitude}")
