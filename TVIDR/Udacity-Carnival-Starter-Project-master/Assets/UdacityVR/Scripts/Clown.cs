using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Clown : MonoBehaviour
{
    #region Constants

    const string DanceTriggerConstant = "HipHop";

    #endregion

    #region Fields

    [SerializeField] Transform handAnchor;
    [SerializeField] Transform targetAnchor;

    [SerializeField] GameObject platePrefab;

    [SerializeField] float speed;

    GameObject currentPlate;

    bool startFly;
    bool hitTheTarget;

    Animator clownAnimator;

    #endregion

    #region Properties

    bool HitTheTarget
    {
        get
        {
            return hitTheTarget;
        }

        set
        {
            if (value != hitTheTarget)
            {
                if (value)
                {
                    startFly = false;

                    ClownAnimator.SetTrigger(DanceTriggerConstant);
                    Destroy(currentPlate);
                    currentPlate = null;
                }

                hitTheTarget = value;
            }
        }
    }

    Animator ClownAnimator
    {
        get
        {
            if (clownAnimator == null)
            {
                clownAnimator = GetComponent<Animator>();
            }

            return clownAnimator;
        }
    }

    #endregion

    #region Unity lifecycle

    void Update()
    {
        if (startFly)
        {
            float step = speed * Time.deltaTime;
            currentPlate.transform.position = Vector3.MoveTowards(currentPlate.transform.position, targetAnchor.position, step);

            HitTheTarget = (targetAnchor.position - currentPlate.transform.position).magnitude < 0.1f;
        }
    }

    #endregion

    #region Public methods

    public void ThrowInBoxes()
    {
        currentPlate = Instantiate(platePrefab);
        currentPlate.transform.position = handAnchor.transform.position;

        startFly = true;
    }

    #endregion
}
