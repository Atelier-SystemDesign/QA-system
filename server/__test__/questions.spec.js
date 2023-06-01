/* eslint-env jest */

const request = require('supertest');

describe('Questions API tests', () => {
  const agent = request('localhost:3000');

  it('Should respond with the proper data', async () => {
    const response = await agent.get('/qa/questions?product_id=300').expect(200);
    // console.log('this is response', JSON.parse(response.text));

    expect(JSON.parse(response.text).product_id).toBe('300');
  });

  it('Should have a array of question objects at the results property', async () => {
    const response = await agent.get('/qa/questions?product_id=300').expect(200);

    expect(typeof JSON.parse(response.text).results[0]).toBe('object');
  });

  it('Should have a array of answer objects at a questions answers property', async () => {
    const response = await agent.get('/qa/questions?product_id=300').expect(200);

    expect(typeof JSON.parse(response.text).results[0].answers).toBe('object');
  });

  it('Should update a questions helpfulness', async () => {
    const response = await agent.get('/qa/questions?product_id=300').expect(200);

    const tempId = JSON.parse(response.text).results[0].question_id;
    const tempHelpfulness = JSON.parse(response.text).results[0].question_helpfulness;
    await agent.put(`/qa/questions/${tempId}/helpful`).expect(204);

    const response2 = await agent.get('/qa/questions?product_id=300').expect(200);
    expect(JSON.parse(response2.text).results[0].question_helpfulness).toBe(tempHelpfulness + 1);
  });
});
