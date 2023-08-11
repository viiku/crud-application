Node Dependencies:
To work node runtime properly, we need these two library
v8
- Converts javascript code to machine code
libuv
- An open source library with strong focus on asynchronous IO. This layer gives Node access to the 
    underlying computer operating system, file system, networking and more. 
- libuv also import two important features of Node.JS  which are the event loop and also the thread pool
    In simple terms, the event loop is responsible for handling easy tasks and network IO while the thread
    pool is for more heavy work like file access or compression or something like that.
    
    - libuv is completely wrtten in c++ and not in javascript. And V8 also uses C++ code besides javascript

- Node js not only rely on v8 and libuv, but also on http-parser for parsing http, c-areas or something like
    for some DNS request stuff, openssl for cryptography and zlib for compression.



NOde Process and Threads

Process: Instance of a program in execution on a computer

Single Thread:  Sequence of instructions, nodejs runs in a Single thread

-----------------------------------------------
Node.JS PROCESS
--------------------------------------
SINGLE THREAD
--------------------------------------
    Initialize program

    Execute top-level code

    Require modules

    Register event callbacks

    Start Event loop

        offloading to thread pool

--------------------------------------
----------------------------------------------

################NOTE
Node application runs in single thread. so when the program is Initialize all the top level code is 
executed, which means all the code that is not inside any callbacks funtion will be executed. Also, alll
the modules that your app needs are reuired and all the callbacks are registered just like the ones that 
we used for our HTTP server in the Node farm APP. Then after all that, the event loop finally starts 
running.

Event loop is where most of the work is done in your app. So, it really the heart of the entire Node arch.
Some tasks are too expensive to be executed in the event loop because they would then block the single
thread, and so that's where the thread pool comes in, which is just like the event loop, is provided to Nodejs
by the libuv library.

    Thread poop gives us additional 4 threads that are completely seprate from the main single thread.
    and it can actully configured it up to 128 thread. Event loop offload heavy tasks to the thread pool,
    all this happens automatically behind the scenes. Developers don't decide what should go to thread pool
    or what not.


Event Loop:

We're still in Node.js process in a single thread where the event loop runs. Event loop runs all the 
application code that is inside callback functions (not-top-top-level code) 

callback functions: functions that are called as soon as some work is finished in some time in the future.

Node Process
    Single Thread
    








Express
    Express is a minimal node.js framework (Built on top of nodejs), a higher level of abstraction
    Express contains a very robust set of features:
        complex rotuing
        easier handling of requests and responses
        middleware
        server side rendering etc...



REST Architecture
    API- Application programmibng interface, a piece of software that can be used by another piece of 
    software, in order to allow applications to talk to each other.

    api endpoints should be 'name' not some kind of verbs.

    https://www.natorus.com/addNewTour

        /addNewTour -------- endpoints


    endpoints i.e:    
            /addNewTour   (CREATE)
                POST---------/tours
            
            /getTour       (READ)
                GET----------/tours/tourID

            /updateTour     (UPDATE)
                PUT----------/tours/7 (update with new object)
                PATCH--------/tours/7 (update an part of the object)
            
            /deleteTour     (DELETE)
                DELETE-------/tours/7

    
Stateless RESTFUL API:
    All state is handled on the client. This means that each reuqest must contain all the information 
    neccessary to process a certain reuqest. The server should not have th=o remember previous requests.

Eample of state:
    loggedIN, currentPage


EXPRESS
    app.use(express.json());
        works as a middleware, so that we can get a javascript body in request format
        middleware should just not about to be request and response object
        it usually is mostly about the request

        express.json to get access to the request body on the request object

        it's a function in the midddle of the recieving the request and sending the response
        in express everything works as a middleware, simple the middleware functions, even the routes
    
        all the middleware together we use in our app alled middleware-stack,

        NOTE: The order of middleware in the stack, is actully defined by the order they're defined in the code.
        so a middleware that appears first in the code, is executed before one that appears later.
    
                    ----------------------MIDDLEWARE STACK---------------------
    INCOMING REQUEST------next()------next()--------next()----------res.send(....)------RESPONSE
                      parsing body    logging     setting headers      router


PARAM MIDDLEWARE
    A special type of Middleware that only runs for certain type of parameter so basically when we have a
    certain type of parameters in url then only, this midddleware would run.

    router.param('id', (req, res, next, val) => {
        console.log(`Tour id is ${val}`);
        next();
    });

    val would actully holds the value of id.
