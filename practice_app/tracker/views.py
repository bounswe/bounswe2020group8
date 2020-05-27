from django.shortcuts import render
from django.http import HttpResponse
from tracker.tracker_api import get_country
# Create your views here.

# def index(request):
#     return HttpResponse('Hello!')

def index(request):
    my_dict = {'insert_me': "Hello I am from views.py!"}
    return render(request, 'tracker/index.html', context=my_dict)

def track(request):

    return render(request, 'tracker/tracking_page.html', context=None)

def track_results(request):

    if request.method == 'POST':
        country = request.POST.get('textfield', None)
        country = country.lower().capitalize()
        # try:
            # Get country data
        country_results = get_country(country)
        my_dict = {'country': country, 'country_results': country_results}
        print()
        return render(request, 'tracker/result_page.html', context=my_dict)
        # except:
        #     return HttpResponse("Invalid Country!")
    else:
        return render(request, 'tracker/tracking_page.html')
