// Messaging constants
var AMQP_CONSUMER_TAG = "start_tag";
var AMQP_EXCHANGE = "racer_exchange";
var AMQP_PASSWORD = "guest";
var AMQP_ROUTING_KEY = "broadcast_key";
var AMQP_TYPE = "fanout";
var AMQP_USERNAME = "guest";
var AMQP_URL = "wss://sandbox.kaazing.net/amqp091";
var AMQP_VIRTUAL_HOST = "/";

// Messaging
var amqp_client = null;
var amqp_factory = null;
var amqp_queue = null;
var consume_channel = null;
var publish_channel = null;

var debug = false;

if( URLParser( window.location.href ).hasParam( "pin" ) ) {
  // PIN code was passed to the page, this is the remote control
  pin = URLParser( window.location.href ).getParam( "pin" );
}
  // If the PIN was not passed as a parameter to the page, it's the racer screen

// Qualifying the Exchange's name with the PIN code
AMQP_EXCHANGE += '_' + pin;

// Convert ArrayBuffer to String
// Effectively binary to text
function arrayBufferToString( buffer )
{
  return String.fromCharCode.apply( null, new Uint8Array( buffer ) );
}

// Send a message
function broadcast( message )
{
  var body = null;

  // Debug
  if( debug )
  {
    console.log( "Broadcast." );
    console.log( message );
  }

  // Data structure as String
  // Convert String to ArrayBuffer
  body = stringToArrayBuffer( JSON.stringify( message ) );

  // Send the message
  publish_channel.publishBasic( {
    body: body,
    properties: null,
    exchange: AMQP_EXCHANGE,
    routingKey: AMQP_ROUTING_KEY
  } );
}

// Convert String to ArrayBuffer
// Effectively text to binary
function stringToArrayBuffer( value )
{
  var buffer = null;
  var view = null;

  buffer = new ArrayBuffer( value.length );
  view = new Uint8Array( buffer );

  for( var i = 0; i < value.length; i++ )
  {
    view[i] = value.charCodeAt( i );
  }

  return buffer;
}

// Connected to Gateway
function doClientOpen()
{
  // Debug
  if( debug )
  {
    console.log( "Connected." );
  }

  // Fire up channels
  publish_channel = amqp_client.openChannel( doPublishOpen );
  consume_channel = amqp_client.openChannel( doConsumeOpen );
}

// Called when bound to queue
// Add client as a consumer
function doConsumeBind()
{
  // Debug
  if( debug )
  {
    console.log( "Queue bound." );
  }

  // Tell server we want to consume messages
  consume_channel.consumeBasic( {
    queue: amqp_queue,
    consumerTag: AMQP_CONSUMER_TAG,
    noAck: true
  } );
}

// Consumer connection closed
function doConsumeClose()
{
  // Debug
  if( debug )
  {
    console.log( "Consume closed." );
  }
}

// Called when the queue is ready
// Bind to the queue
function doConsumeDeclare()
{
  // Debug
  if( debug )
  {
    console.log( "Queue declared." );
  }

  // Bind to queue
  consume_channel.bindQueue( {
    queue: amqp_queue,
    exchange: AMQP_EXCHANGE,
    routingKey: AMQP_ROUTING_KEY
  } );
}

// Called when channel is active
// Can pause and restart the flow of data
function doConsumeFlow()
{
  // Debug
  if( debug )
  {
    console.log( "Data flowing." );
  }
}

// Called when the consumer is open
// Event listeners for queueing
function doConsumeOpen()
{
  // Debug
  if( debug )
  {
    console.log( "Consume open." );
  }

  // Event listeners
  consume_channel.addEventListener( "declarequeue", doConsumeDeclare );
  consume_channel.addEventListener( "bindqueue", doConsumeBind );
  consume_channel.addEventListener( "consume", doConsumeReady );
  consume_channel.addEventListener( "flow", doConsumeFlow );
  consume_channel.addEventListener( "close", doConsumeClose );
  consume_channel.addEventListener( "message", doConsumeMessage );

  // Declare the queue
  consume_channel.declareQueue( {
    queue: amqp_queue
  } );
}

// Called when ready to consume messages
// Everything is ready to go at this point
function doConsumeReady()
{
  // Debug
  if( debug )
  {
    console.log( "Consume ready." );
  }
}

// Called when publisher has been declared
function doPublishDeclare()
{
  // Debug
  if( debug )
  {
    console.log( "Exchange declared." );
  }
}

// Called when publisher is connected
function doPublishOpen()
{
  // Debug
  if( debug )
  {
    console.log( "Publish open." );
  }

  // Declare publisher
  publish_channel.declareExchange( {
    exchange: AMQP_EXCHANGE,
    type: AMQP_TYPE
  } );

  // Listen for when the declaration is complete
  publish_channel.addEventListener( "declareexchange", doPublishDeclare );
}

// Debugging
// Optional "debug" parameter on the query string
if( !URLParser( window.location.href ).hasParam( "debug" ) )
{
  debug = false;
  console.log( "Add query variable \"debug\" to see messages." );
} else {
  debug = true;
}

// AMQP queue name
// Needs to be unique
amqp_queue = "racer" + Date.now();

// Get a connection to Gateway
// Publish and consume will follow
amqp_factory = new AmqpClientFactory();
amqp_client = amqp_factory.createAmqpClient();
amqp_client.connect( {
  url: AMQP_URL,
  virtualHost: AMQP_VIRTUAL_HOST,
  credentials: {
    username: AMQP_USERNAME,
    password: AMQP_PASSWORD
  }
},
doClientOpen
);
