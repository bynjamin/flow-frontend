declare module '@bit/bynjamin.orbit.illustration' {
  export default function Illustration(props: IllustrationProps): JSX.Element;
}

interface IllustrationProps {
  name: IllustrationName;
  size?: SizeType;
  spaceAfter?: SpaceAfterType;
  dataTest?: string;
}

type IllustrationName =
  | 'Accommodation'
  | 'AirHelp'
  | 'AirportTransport'
  | 'AirportTransportTaxi'
  | 'AirportShuttle'
  | 'AppQRCode'
  | 'BaggageDrop'
  | 'Boarding'
  | 'BoardingPass'
  | 'BusinessTravel'
  | 'CabinBaggage'
  | 'CompassCollectPoints'
  | 'CompassDemoted'
  | 'CompassEmailAdventurer'
  | 'CompassEmailCaptain'
  | 'CompassEmailPromoted'
  | 'CompassEmailPromotedCaptain'
  | 'CompassEmailScout'
  | 'CompassPoints'
  | 'CompassTravelPlan'
  | 'CompassSaveOnBooking'
  | 'DesktopSearch'
  | 'EnjoyApp'
  | 'Error'
  | 'Error404'
  | 'FastTrack'
  | 'Feedback'
  | 'Help'
  | 'Improve'
  | 'Insurance'
  | 'InviteAFriend'
  | 'Login'
  | 'Lounge'
  | 'Mailbox'
  | 'Meal'
  | 'MobileApp'
  | 'Money'
  | 'MusicalInstruments'
  | 'NetVerify'
  | 'NoBookings'
  | 'NoFavoriteFlights'
  | 'Nomad'
  | 'NomadNeutral'
  | 'NoNotification'
  | 'NoResults'
  | 'Offline'
  | 'OnlineCheckIn'
  | 'OpenSearch'
  | 'Parking'
  | 'Pets'
  | 'PlaceholderAirport'
  | 'PlaceholderDestination'
  | 'PlaceholderHotel'
  | 'PlaceholderTours'
  | 'PlaneAndMoney'
  | 'PriorityBoarding'
  | 'Rating'
  | 'ReferAFriend'
  | 'RentalCar'
  | 'Seating'
  | 'SpecialAssistance'
  | 'SportsEquipment'
  | 'Success'
  | 'Time'
  | 'TimelineBoarding'
  | 'TimelineDropBaggage'
  | 'TimelineLeave'
  | 'TimelinePick'
  | 'Tours'
  | 'Train'
  | 'TransportBus'
  | 'TransportTaxi'
  | 'WomanWithPhone';

type SizeType = 'small' | 'medium' | 'large' | 'dosplay';

type SpaceAfterType =
  | 'none'
  | 'smallest'
  | 'small'
  | 'normal'
  | 'medium'
  | 'large'
  | 'largest';
