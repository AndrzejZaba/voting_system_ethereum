from scripts.helpful_scripts import get_account, GAS_PRICE
from brownie import VotingSystem, config, network
import json
import os
import shutil

def deploy_voting_system():
    account = get_account()
    voting_system = VotingSystem.deploy({"from":account, "gas_price": GAS_PRICE}, publish_source=config["networks"][network.show_active()].get("verify"))
    print(f"Contract deployed to {voting_system.address}")
    copy_folders_to_front_end("./build", "./front_end/src/chain-info")
    return voting_system

def print_active_network():
    print(network.show_active())
    print(config["networks"][network.show_active()].get("verify"))

def copy_folders_to_front_end(source, destination):
    if os.path.exists(destination):
        shutil.rmtree(destination)
    shutil.copytree(src=source, dst=destination)

def main():
    deploy_voting_system()
    