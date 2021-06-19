// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const startTime = Date.now()

export default (req, res) => {
  res.status(200).json({ startTime })
}
