// SPDX-License-Identifier: Apache-2.0

"use strict";

const { Contract } = require("fabric-contract-api");

class BIMS extends Contract {
  async instantiate(ctx) {
    console.log("Identity contract instantiated");
  }
  _checkRole(ctx, role) {
    const attrs = ctx.clientIdentity.getAttributeValue("role");

    if (!attrs) {
      throw new Error("No attributes found");
    }

    return attrs === role;
  }
  async getCTXAttrs(ctx) {
    return JSON.stringify(ctx.clientIdentity.getAttributeValue("role"));
  }

  async createIdentity(ctx, id, name) {
    if (!this._checkRole(ctx, "admin")) {
      throw new Error("Only admin can create identities");
    }
    const identity = {
      id: id,
      name: name,
      employmentProofs: [],
      educationProofs: [],
      sharedWith: [],
    };

    // Check if identity already exists
    const identityBytes = await ctx.stub.getState(id);

    if (!identityBytes || identityBytes.length > 0) {
      throw new Error(`Identity with ID ${id} already exists`);
    }

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

  async shareDataWithOrganization(ctx, id, organizationId) {
    const identityBytes = await ctx.stub.getState(id);

    if (!identityBytes || identityBytes.length === 0) {
      throw new Error(`Identity with ID ${id} does not exist`);
    }

    const identity = JSON.parse(identityBytes.toString());
    identity.sharedWith.push(organizationId);

    await ctx.stub.putState(id, Buffer.from(JSON.stringify(identity)));
    return JSON.stringify(identity);
  }
  async getTransactionDetailsByID(ctx, txID) {
    const result = await ctx.stub.evaluateTransactionByID(txID);
    const transaction = JSON.parse(result.toString());
    return transaction;
  }

  async getIdentityUpdates(ctx, id) {
    const iterator = await ctx.stub.getHistoryForKey(id);
    const updates = [];

    while (true) {
      const response = await iterator.next();

      if (response.done) {
        break;
      }

      const transaction = {
        transactionId: response.value.txId,
        timestamp: new Date(response.value.timestamp.seconds * 1000),
        value: JSON.parse(response.value.value.toString("utf8")),
      };

      updates.push(transaction);
    }

    return updates;
  }

  async approveEducationProof(ctx, id, proofId) {
    const identityBytes = await ctx.stub.getState(id);

    if (!identityBytes || identityBytes.length === 0) {
      throw new Error(`Identity with ID ${id} does not exist`);
    }

    const identity = JSON.parse(identityBytes.toString());

    identity.educationProofs = identity.educationProofs.map((proof) =>
      typeof proof === "string" ? JSON.parse(proof) : proof
    );

    const proof = identity.educationProofs.filter(
      (proof) => proof.id === proofId
    );

    if (!proof || proof.length === 0) {
      throw new Error(
        `Proof with ID ${proofId} does not exist ${JSON.stringify(
          identity.educationProofs
        )}`
      );
    }

    let updated = {
      ...identity,
    };

    updated.educationProofs = updated.educationProofs.map((proof) => {
      if (proof.id === proofId) {
        return {
          ...proof,
          verified: true,
        };
      }

      return JSON.stringify(proof);
    });

    await ctx.stub.putState(id, Buffer.from(JSON.stringify(updated)));
    return JSON.stringify(updated);
  }

  async approveEmploymentProof(ctx, id, proofId) {
    const identityBytes = await ctx.stub.getState(id);

    if (!identityBytes || identityBytes.length === 0) {
      throw new Error(`Identity with ID ${id} does not exist`);
    }

    const identity = JSON.parse(identityBytes.toString());

    identity.employmentProofs = identity.employmentProofs.map((proof) =>
      typeof proof === "string" ? JSON.parse(proof) : proof
    );

    const proof = identity.employmentProofs.filter(
      (proof) => proof.id === proofId
    );

    if (!proof || proof.length === 0) {
      throw new Error(
        `Proof with ID ${proofId} does not exist ${JSON.stringify(
          identity.employmentProofs
        )}`
      );
    }

    let updated = {
      ...identity,
    };

    updated.employmentProofs = updated.employmentProofs.map((proof) => {
      if (proof.id === proofId) {
        return {
          ...proof,
          verified: true,
        };
      }

      return JSON.stringify(proof);
    });

    await ctx.stub.putState(id, Buffer.from(JSON.stringify(updated)));
    return JSON.stringify(updated);
  }

  async getIdentityForOrganization(ctx, id) {
    const identityBytes = await ctx.stub.getState(id);

    if (!identityBytes || identityBytes.length === 0) {
      throw new Error(`Identity with ID ${id} does not exist`);
    }

    const identity = JSON.parse(identityBytes.toString());
    // Check if the organization is allowed to see the identity
    if (!identity.sharedWith.includes(ctx.clientIdentity.getMSPID())) {
      throw new Error(
        `Organization ${ctx.clientIdentity.getMSPID()} is not allowed to see identity ${id}`
      );
    }

    return JSON.stringify(identity);
  }
}

module.exports = BIMS;
