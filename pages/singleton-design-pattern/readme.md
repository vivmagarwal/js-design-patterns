# Singleton Design Pattern

Singletons are objects that can only have a single instance, with a single point of access. Singletons are useful for maintaining a central state, where all clients need to access and operate on a common resource.

Node's module system caches the module the moment it is accessed using a require statement for the very first time. Thereafter the same instance is reffered to everywhere. No matter how many times you impoert this module accross your application, it will access the same cached and common instance. So the Node's module system offers a rudimentary implementation if a singleton.

However, this behaviour is dependent on the filename consistency. Difference in capitalization in filenames will result in multiple cached instances.

When working with classes, instantiating a class before exporting it out of a module will result in a singleton.
