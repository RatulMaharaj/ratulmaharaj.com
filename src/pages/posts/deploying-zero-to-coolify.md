---
layout: "@/layouts/BlogPost"
title: Zero cache on Coolify
pubDate: 9 March 2025
description: Self hosting your zero cache instance
tags: ["zero"]
author: "Ratul Maharaj"
---

## Deploying Zero

To deploy an app that uses Zero as it's data/syncing layer, you need the following:

- A postgres database. This can be any postgres database but it needs to have `wal_level` set to 'logical'.
- A zero-cache server. Rocicorp provides a [Docker image](https://hub.docker.com/r/rocicorp/zero) that can work with most Docker hosts.
- A client app. I use vercel to deploy my frontend.

This post will describe how to deploy a minimal zero-cache instance as a docker container to Coolify. For more info on deployments, check out the [zero docs](https://zero.rocicorp.dev/docs/deployment).

The total cost of this running this app can be as a low as $5-$10 per month.

## Prerequisites

This post is going to assume you have a working knowledge of docker, docker-compose and self-hosting applications using Coolify. 

You'll need:

- A self hosted instance of Coolify or [Coolify cloud](https://Coolify.io/cloud/)
- A PostgreSQL database


## Setup Upstream Database

The first step is preparing your PostgreSQL database to work with Zero:

1. You'll need to enable logical replication in your PostgreSQL configuration by setting `wal_level` to `logical`.

This can be done by running the following SQL command:

```sql
ALTER SYSTEM SET wal_level = 'logical';
```
After running this command, restart your PostgreSQL server for the changes to take effect.


2. If your migration tool doesn't handle this for you (like with drizzle), you will need to create the upstream database for your Zero application:

```sql
CREATE DATABASE zerodb;
```

The url to this database will need to be set as `ZERO_UPSTREAM_DB` in your environment variables. Do not include `?schema=public`.

In some guides, you might see the following additional databases being created:

**CVR database**

A separate Postgres database used to store CVRs (Client View Records). CVRs keep track of which clients have which data, enabling zero-cache to send the correct diff on reconnect. 

This is not required for a basic setup and you can set the env var `ZERO_CVR_DB` to the same value as `ZERO_UPSTREAM_DB`.

**Change database**

Another postgres database used to store a replication log.

This is also not required for a basic setup and you can set the env var `ZERO_CHANGE_DB` to the same value as `ZERO_UPSTREAM_DB`.

## Deploy to Coolify

Using Coolify, we will deploy our zero-cache server to a small Hetzner server (CAX11 - 2vCPUs 4GB RAM) which costs approximately about €4.36/month. In my experience, this is more than adequate for a small Zero application.

Ensure that you have added your server to Coolify and have created a project. Once in the project, we will add a new service/resource. Select the *Docker Compose Empty* option. 

## The docker-compose file

Here's a minimal docker-compose file for deploying Zero cache:

```yaml
services:
  zero_cache:
    image: 'rocicorp/zero:latest'
    environment:
      - 'ZERO_UPSTREAM_DB=${ZERO_UPSTREAM_DB}'
      - 'ZERO_CVR_DB=${ZERO_CVR_DB}'
      - 'ZERO_CHANGE_DB=${ZERO_CHANGE_DB}'
      - 'ZERO_AUTH_JWKS_URL=${ZERO_AUTH_JWKS_URL}'
      - 'ZERO_UPSTREAM_MAX_CONNS=${ZERO_UPSTREAM_MAX_CONNS}'
      - 'ZERO_CVR_MAX_CONNS=${ZERO_CVR_MAX_CONNS}'
      - 'ZERO_CHANGE_MAX_CONNS=${ZERO_CHANGE_MAX_CONNS}'
      - ZERO_REPLICA_FILE=/zero_data/zchat_replica.db
      - ZERO_PORT=4848
    volumes:
      - 'replica:/zero_data'
volumes:
  replica:
```

These are the environment variables I would set:

**ZERO_UPSTREAM_DB**

The URL to your upstream database. This is a required variable.

**ZERO_CVR_DB**

The URL to your CVR database. This can be set to the same value as `ZERO_UPSTREAM_DB`.

**ZERO_CHANGE_DB**

The URL to your change database. This can be set to the same value as `ZERO_UPSTREAM_DB`.

**ZERO_AUTH_JWKS_URL**

The URL to your auth provider's JWKS endpoint (I'm using auth0 in this example). You might want to set 
`ZERO_AUTH_SECRET` instead if you're rolling your own auth.

**ZERO_UPSTREAM_MAX_CONNS**

The maximum number of connections to the upstream database for committing mutations. I would set this to `4` based on our server size.

**ZERO_CVR_MAX_CONNS**

The maximum number of connections to the CVR database. I would set this to `20` based on our server size.

**ZERO_CHANGE_MAX_CONNS**

The maximum number of connections to the change database. I would set this to `1` based on our server size.

For more info on the environment variables check out the [cache config](https://zero.rocicorp.dev/docs/zero-cache-config) section of the Zero docs.

## Final thoughts

Self-hosting Zero cache on Coolify provides a cost-effective way to run local-first applications with full control over your infrastructure. The combination of PostgreSQL's robust replication capabilities and Zero's elegant sync engine creates a powerful foundation for your application.

For larger deployments or high-traffic applications, you might need to scale up your Coolify server or consider more advanced [multi-node deployment](https://zero.rocicorp.dev/docs/deployment#guide-multi-node-on-sstaws) options, but for most small applications, this setup should work perfectly.

Happy self-hosting!