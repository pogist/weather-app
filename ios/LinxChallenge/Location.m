#import "Location.h"

@interface Location () <CLLocationManagerDelegate>

@end

@implementation Location {
  CLLocationManager *_manager;
  NSMutableArray<RCTResponseSenderBlock> *_requestCallbacks;
  NSMutableArray<RCTResponseSenderBlock> *_getCurrentCallbacks;
}

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(getCurrent:(RCTResponseSenderBlock)callback)
{
  if (!_manager) {
    _manager = [CLLocationManager new];
    _manager.delegate = self;
  }
  if (!_getCurrentCallbacks) {
    _getCurrentCallbacks = [NSMutableArray new];
    if (callback) {
      [_getCurrentCallbacks addObject:callback];
    }
  }
  [_manager requestLocation];
}

RCT_EXPORT_METHOD(isEnabled:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  if (!_manager) {
    _manager = [CLLocationManager new];
    _manager.delegate = self;
  }
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    CLAuthorizationStatus status;
    if (@available(iOS 14, *)) {
      status = [self->_manager authorizationStatus];
    } else {
      status = [CLLocationManager authorizationStatus];
    }
    BOOL enabled = [CLLocationManager locationServicesEnabled];
    BOOL granted = status == kCLAuthorizationStatusAuthorizedAlways || status == kCLAuthorizationStatusAuthorizedWhenInUse;
    resolve(@(enabled && granted));
  });
}

RCT_EXPORT_METHOD(request:(RCTResponseSenderBlock)callback)
{
  if (!_manager) {
    _manager = [CLLocationManager new];
    _manager.delegate = self;
  }
  if (!_requestCallbacks) {
    _requestCallbacks = [NSMutableArray new];
    if (callback) {
      [_requestCallbacks addObject:callback];
    }
  }
  [_manager requestWhenInUseAuthorization];
}

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray<CLLocation *> *)locations
{
  CLLocation *location = [locations lastObject];
  if (_getCurrentCallbacks && [_getCurrentCallbacks count] > 0) {
    for (RCTResponseSenderBlock callback in _getCurrentCallbacks) {
      callback(@[[NSNull null], @{@"lat": @(location.coordinate.latitude),
                                  @"long": @(location.coordinate.longitude)}]);
    }
    _getCurrentCallbacks = nil;
  }
}

- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error
{
  if (_getCurrentCallbacks && [_getCurrentCallbacks count] > 0) {
    for (RCTResponseSenderBlock callback in _getCurrentCallbacks) {
      callback(@[error, [NSNull null]]);
    }
    _getCurrentCallbacks = nil;
  }
}

- (void)onStatusChange:(CLLocationManager *)manager
{
  CLAuthorizationStatus status;
  if (@available(iOS 14, *)) {
    status = [manager authorizationStatus];
  } else {
    status = [CLLocationManager authorizationStatus];
  }
  BOOL granted = status == kCLAuthorizationStatusAuthorizedAlways || status == kCLAuthorizationStatusAuthorizedWhenInUse;
  if (_requestCallbacks && [_requestCallbacks count] > 0) {
    for (RCTResponseSenderBlock callback in _requestCallbacks) {
      callback(@[[NSNull null], @(granted)]);
    }
    _requestCallbacks = nil;
  }
}

- (void)locationManagerDidChangeAuthorization:(CLLocationManager *)manager
{
  [self onStatusChange:manager];
}

- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status
{
  [self onStatusChange:manager];
}

@end
