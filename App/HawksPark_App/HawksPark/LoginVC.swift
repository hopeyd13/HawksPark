//
//  ViewController.swift
//  HawksPark
//
//  Created by Mahmoud shabana on 1/21/20.
//  Copyright © 2020 Monmouth University. All rights reserved.
//

import UIKit
import FirebaseAuth

class LoginVC: UIViewController {
    
    @IBOutlet weak var seg: UISegmentedControl!
    @IBOutlet weak var email: UITextField!
    @IBOutlet weak var password: UITextField!
    @IBOutlet weak var btn: UIButton!
    @IBAction func btn_clicked(_ sender: Any) {
        
        if seg.selectedSegmentIndex == 0 {
            login()
        } else if seg.selectedSegmentIndex == 1 {
            signUp()
        }
    }
    

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    func login() {
        if self.email.text == "" || self.password.text == "" {
            print("Please Enter in the Text Field")
        } else {
            Auth.auth().signIn(withEmail: self.email.text!, password: self.password.text!) { (user, error) in
                if error == nil {
                    print("Successful login")
                    self.performSegue(withIdentifier: "mapViewSegue", sender: nil)
                } else {
                    print("Error in Login")
                }
            }
        }
        
    }
    
    func signUp() {
        if email.text == "" {
            print("Error")
        } else {
            Auth.auth().createUser(withEmail: email.text!, password: password.text!) {(user, error) in
                if error == nil {
                    print("Successful Sign Up")
                } else {
                    print(error)
                }
            }
        }
    }


}

