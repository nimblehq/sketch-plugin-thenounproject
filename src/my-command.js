export function fetch(context) {
   var doc = context.document;
   var selection = context.selection

    function alert(msg, title) {
        var app = NSApplication.sharedApplication();
        app.displayDialog_withTitle(msg, title || "Hear yee, Hear yee");
    }

    function getFaviconModal() {
        var userInput = doc.askForUserInput_initialValue("Enter URL of website website (e.g. www.airbnb.com):", "http://");
        if (userInput !== null) {
            var url = NSURL.URLWithString(userInput).host;
            if (url !== null) {
                fetchThatFavicon(url);
            }
            else {
                 //  alert('bla bla error', 'Destination shape');
                 getFaviconModal();
            }
        }
    }

    function fetchThatFavicon(url) {
        var apiURL      = NSURL.URLWithString('https://www.google.com/s2/favicons?domain=' + url);
        var request     = NSURLRequest.requestWithURL(apiURL);
        var response    = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);

        if (!response && response.length() === 0) {
            alert('No favicon found for URL "' + url + '".', 'No favicon found');
        }
        else {
            log('Found favicon for URL "' + url + '"');

            var faviconImage = NSImage.alloc().initWithData(response);
            var faviconImageData = MSImageData.alloc().initWithImage_convertColorSpace(faviconImage, false);
            var allLayers = doc.currentPage().layers();
            for (var i = 0; i < selection.count(); i++) {
                var layer = selection[i];
                if (layer.class() == MSShapeGroup) {
                    fill = layer.style().fills().firstObject();
                    coll = fill.documentData().images();
                    fill.setFillType(4);         // Pattern fillType
                    fill.setPatternFillType(1);
                    fill.setIsEnabled(true);
                    fill.setImage(faviconImageData);
                }
            }
        }
    }

    function activate() {
        if (selection.count() == 0) {
            alert('Please select a shape to fill the favicon into.', 'Destination shape');
        } else {
            getFaviconModal();
        }
    }

    activate();

}


//-------------------------------------------------------------------------------------------------------------


// GET GPLAY ICON BY NAME OF APP


// function getGplayAppicon(context) {
//   var doc = context.document;
//   var selection = context.selection

//     function alert(msg, title) {
//         var app = [NSApplication sharedApplication];
//         [app displayDialog:msg withTitle:title || "Error"];
//     }

//     function getGplayiconModal() {

//         var userInput = [doc askForUserInput:"Enter any Android app's name (i.e. Facebook)):" initialValue:""];

//         if (userInput !== null) {


//             if (userInput !== null) {

//                 fetchThatGplayicon(userInput);
//             }
//             else {
//                  alert('error', 'Destination shape');
//             }
//         }
//     }

//     function fetchThatGplayicon(appName) {
//         var apiURL      = [NSURL URLWithString:'https://api.import.io/store/data/8dda5db7-deee-44a7-90af-9a49b603b82b/_query?input/webpage/url=https%3A%2F%2Fplay.google.com%2Fstore%2Fsearch%3Fq%3D'+ appName +'%26c%3Dapps&_user=cdb830ea-85cb-4488-8ccd-cd9c6e7a9488&_apikey=cdb830ea85cb44888ccdcd9c6e7a94888e57b45cbdfd7aa6287207d1b2bd54e77f98b99b9d4b9fced1f5e4b1fb7784c7528712988270767e8f642719bcce6a21759beb8d77971dd2f378ac375acfc95c'];
//         var request     = [NSURLRequest requestWithURL:apiURL];
//         var response    = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);

//         var json = [NSJSONSerialization JSONObjectWithData:response options:nil error:nil];

//         var imgUrlString = json.results[0].image_icon;
//         var imgURL      = [NSURL URLWithString:imgUrlString];
//         var imgRequest     = [NSURLRequest requestWithURL:imgURL];
//         var img = NSURLConnection.sendSynchronousRequest_returningResponse_error(imgRequest, null, null);

//         var GplayiconImage = [[NSImage alloc] initWithData:img];
// 	    var GplayiconImageData = [[MSImageData alloc] initWithImage:GplayiconImage convertColorSpace:false];
//         var allLayers = [[doc currentPage] layers];
//         for (var i = 0; i < [selection count]; i++) {
//             var layer = selection[i];
//             if ([layer class] == MSShapeGroup) {
//                 fill = layer.style().fills().firstObject();
//                 coll = fill.documentData().images();
//                 //[fill setPatternImage:GplayiconImage collection:coll];
//                 fill.setFillType(4);         // Pattern fillType
//                 fill.setPatternFillType(1);
//                 fill.setIsEnabled(true);
//                 [fill setImage:GplayiconImageData];
//             }
//         }

//     }



//     function activate() {
//         log(selection[0].frame());
//         if ([selection count] == 0) {
//             alert('Please select a shape to fill the Google Play app icon into.', 'Destination shape');
//         }
//         else {
//             getGplayiconModal();
//         }
//     }

//     activate();

// };
