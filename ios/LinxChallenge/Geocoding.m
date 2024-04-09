#import "Geocoding.h"

@implementation Geocoding {
  CLGeocoder *_geocoder;
}

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

RCT_EXPORT_METHOD(getLocation:(NSString *)name
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if (!_geocoder) {
    _geocoder = [[CLGeocoder alloc] init];
  }
  [_geocoder geocodeAddressString:name
                completionHandler:^(NSArray<CLPlacemark *> * _Nullable placemarks, NSError * _Nullable error) {
    if (error) {
      reject(@"", @"Get location error", error);
    } else {
      CLLocation *location = [[placemarks firstObject] location];
      if (location) {
        resolve(@{
          @"lat": @(location.coordinate.latitude),
          @"long": @(location.coordinate.longitude),
        });
      }
    }
  }];
}

@end
