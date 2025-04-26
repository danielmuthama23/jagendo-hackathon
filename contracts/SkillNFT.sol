// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SkillNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    string private _baseTokenURI;
    
    struct Skill {
        string name;
        uint256 expiryDate;
    }
    
    mapping(uint256 => Skill) public skills;

    constructor() ERC721("JagedoSkill", "JSKILL") Ownable(msg.sender) {}

    function mint(
        address to, 
        string memory skillName,
        uint256 expiryDate
    ) external onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter++;
        _safeMint(to, tokenId);
        
        skills[tokenId] = Skill({
            name: skillName,
            expiryDate: expiryDate
        });
        
        return tokenId;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    function isSkillValid(uint256 tokenId) public view returns (bool) {
        return skills[tokenId].expiryDate > block.timestamp;
    }
}