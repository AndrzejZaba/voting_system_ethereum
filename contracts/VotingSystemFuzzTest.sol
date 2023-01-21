// SPDX-License-Identifier: MIT
import "./VotingSystem.sol";

pragma solidity ^0.8.16;

contract VotingSystemFuzzTest is VotingSystem {
    constructor() public {
        electionChief = address(0x0);
    }

    function echidna_test_owner() public view returns (bool) {
        return electionChief == address(0x0);
    }

    function echidna_test_electionOpen() public view returns (bool) {
        return electionOpen == true;
    }

    function echidna_test_allowedToVote_after_voting() public returns (bool) {
        vote("Jan", "Kowalski", "00223390432", "Kandydat 1");
        return voters["00223390432"].allowedToVote == false;
    }

    function echidna_test_correct_votes_value() public view returns (bool) {
        return
            votesValue("Kandydat 1") == candidates["Kandydat 1"].receivedVotes;
    }
}
