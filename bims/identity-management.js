// SPDX-License-Identifier: Apache-2.0

"use strict";

const { Contract } = require("fabric-contract-api");

class IdentityContract extends Contract {
  async instantiate(ctx) {
    console.log("Identity contract instantiated");
  }

  async createIdentity(ctx, id, name) {
    const identity = {
      id: id,
      name: name,
      employmentProofs: [],
      educationProofs: [],
    };

    await ctx.stub.putState(id, Buffer.from(JSON.stringify(identity)));
    return JSON.stringify(identity);
  }

  async getIdentity(ctx, id) {
    const identityBytes = await ctx.stub.getState(id);

    if (!identityBytes || identityBytes.length === 0) {
      throw new Error(`Identity with ID ${id} does not exist`);
    }

    return identityBytes.toString();
  }

  async updateIdentity(ctx, id, data) {
    const identityBytes = await ctx.stub.getState(id);

    if (!identityBytes || identityBytes.length === 0) {
      throw new Error(`Identity with ID ${id} does not exist`);
    }

    const identity = JSON.parse(identityBytes.toString());
    const updatedIdentity = Object.assign(identity, data);

    await ctx.stub.putState(id, Buffer.from(JSON.stringify(updatedIdentity)));
    return JSON.stringify(updatedIdentity);
  }

  async addEmploymentProof(ctx, id, proof) {
    const identityBytes = await ctx.stub.getState(id);

    if (!identityBytes || identityBytes.length === 0) {
      throw new Error(`Identity with ID ${id} does not exist`);
    }

    const identity = JSON.parse(identityBytes.toString());
    identity.employmentProofs.push(proof);

    await ctx.stub.putState(id, Buffer.from(JSON.stringify(identity)));
    return JSON.stringify(identity);
  }

  async addEducationProof(ctx, id, proof) {
    const identityBytes = await ctx.stub.getState(id);

    if (!identityBytes || identityBytes.length === 0) {
      throw new Error(`Identity with ID ${id} does not exist`);
    }

    const identity = JSON.parse(identityBytes.toString());
    identity.educationProofs.push(proof);

    await ctx.stub.putState(id, Buffer.from(JSON.stringify(identity)));
    return JSON.stringify(identity);
  }

  async shareDataWithOrganization(ctx, id, organization, dataType) {
    const identityBytes = await ctx.stub.getState(id);

    if (!identityBytes || identityBytes.length === 0) {
      throw new Error(`Identity with ID ${id} does not exist`);
    }

    const identity = JSON.parse(identityBytes.toString());

    if (organization === "company") {
      identity.shareEmploymentData = dataType;
    } else if (organization === "university") {
      identity.shareEducationData = dataType;
    } else {
      throw new Error(`Invalid organization: ${organization}`);
    }

    await ctx.stub.putState(id, Buffer.from(JSON.stringify(identity)));
    return JSON.stringify(identity);
  }
}

module.exports = IdentityContract;
