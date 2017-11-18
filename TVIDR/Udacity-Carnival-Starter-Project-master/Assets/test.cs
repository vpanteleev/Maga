using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class test : MonoBehaviour {

	public GameObject destroyedVersion;
	// Use this for initialization
	public void destroyThisObject () {
		Instantiate(destroyedVersion, transform.position, transform.rotation);
		Destroy(gameObject);

	}
}
