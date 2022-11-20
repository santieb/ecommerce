import db from '../../config/database'

const getProducts = async () => {
  return await db.product.findMany()
}

export default { getProducts }
