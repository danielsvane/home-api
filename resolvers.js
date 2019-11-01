const { PubSub } = require('apollo-server')
const { ObjectId } = require('mongodb')

const HOME_ADDED = 'HOME_ADDED'
const HOME_REMOVED = 'HOME_REMOVED'

const pubsub = new PubSub()

function prepare (o) {
  o.id = o._id.toString()
  return o
}

module.exports = {
  Query: {
    async homes (parent, args, { db }) {
      const homes = (await db.collection('homes').find({}).toArray()).map(prepare)
      return homes
    }
  },
  Mutation: {
    async addHome (root, args, { db }) {
      const res = await db.collection('homes').insertOne(args)
      const home = prepare(res.ops[0])

      pubsub.publish(HOME_ADDED, {
        homeAdded: home
      })

      return home
    },
    async removeHome (root, { id }, { db }) {
      await db.collection('homes').deleteOne({
        _id: ObjectId(id)
      })

      pubsub.publish(HOME_REMOVED, {
        homeRemoved: id
      })

      return id
    }
  },
  Subscription: {
    homeAdded: {
      subscribe: () => pubsub.asyncIterator([HOME_ADDED])
    },
    homeRemoved: {
      subscribe: () => pubsub.asyncIterator([HOME_REMOVED])
    }
  }
}
